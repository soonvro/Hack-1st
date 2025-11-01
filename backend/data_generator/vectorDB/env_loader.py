#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
환경 변수 로더 유틸리티
다양한 운영체제의 쉘 설정 파일에서 환경 변수를 로드합니다.
"""

import os
import subprocess
import platform
from pathlib import Path
import logging

logger = logging.getLogger(__name__)


def get_shell_config_files():
    """운영체제와 쉘에 따른 설정 파일 경로 반환"""
    home = Path.home()
    system = platform.system().lower()
    
    config_files = []
    
    if system == "darwin":  # macOS
        # zsh (macOS 기본 쉘)
        config_files.extend([
            (home / ".zshrc", "zsh"),
            (home / ".zprofile", "zsh"),
        ])
        # bash (하위 호환성)
        config_files.extend([
            (home / ".bash_profile", "bash"),
            (home / ".bashrc", "bash"),
        ])
    elif system == "linux":  # Linux
        shell = os.environ.get("SHELL", "").lower()
        if "zsh" in shell:
            config_files.extend([
                (home / ".zshrc", "zsh"),
                (home / ".zprofile", "zsh"),
            ])
        elif "bash" in shell or not shell:
            config_files.extend([
                (home / ".bashrc", "bash"),
                (home / ".bash_profile", "bash"),
            ])
    elif system == "windows":  # Windows
        # Windows는 PowerShell 프로필 또는 .env 파일 사용
        powershell_profile = Path.home() / "Documents" / "PowerShell" / "Microsoft.PowerShell_profile.ps1"
        if powershell_profile.exists():
            config_files.append((powershell_profile, "powershell"))
        
        # .env 파일도 확인 (일반적인 위치들)
        env_files = [
            home / ".env",
            Path.cwd() / ".env",
        ]
        for env_file in env_files:
            if env_file.exists():
                config_files.append((env_file, "env"))
    
    # 존재하는 파일만 반환
    return [(path, shell) for path, shell in config_files if path.exists()]


def load_shell_config(config_path: Path, shell_type: str):
    """쉘 설정 파일에서 환경 변수를 로드"""
    important_vars = [
        "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", 
        "AWS_BEDROCK_API_KEY", "AWS_DEFAULT_REGION",
        "GOOGLE_API_KEY", "OPENAI_API_KEY"
    ]
    
    env_count = 0
    
    try:
        if shell_type in ["zsh", "bash"]:
            # zsh 또는 bash를 사용하여 설정 파일을 source
            cmd = [shell_type, "-c", f"source {config_path} && env"]
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=5
            )
            
            if result.returncode != 0:
                logger.debug(f"{config_path.name} 로드 중 오류: {result.stderr}")
                return 0
            
            # 환경 변수 파싱 및 설정
            for line in result.stdout.splitlines():
                if "=" in line:
                    key, value = line.split("=", 1)
                    if key in important_vars and key not in os.environ:
                        os.environ[key] = value
                        env_count += 1
        
        elif shell_type == "powershell":
            # PowerShell 프로필 실행 (Windows)
            cmd = ["powershell", "-Command", f". {config_path}; Get-ChildItem Env: | Where-Object {{ $_.Name -in @('AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY','AWS_BEDROCK_API_KEY','AWS_DEFAULT_REGION','GOOGLE_API_KEY','OPENAI_API_KEY') }} | ForEach-Object {{ $_.Name + '=' + $_.Value }}"]
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=5
            )
            
            if result.returncode == 0:
                for line in result.stdout.splitlines():
                    if "=" in line:
                        key, value = line.split("=", 1)
                        if key in important_vars and key not in os.environ:
                            os.environ[key] = value
                            env_count += 1
        
        elif shell_type == "env":
            # .env 파일 파싱 (간단한 형식)
            with open(config_path, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith('#'):
                        continue
                    
                    if "=" in line:
                        key, value = line.split("=", 1)
                        # 따옴표 제거
                        value = value.strip('"\'')
                        if key in important_vars and key not in os.environ:
                            os.environ[key] = value
                            env_count += 1
        
        return env_count
        
    except subprocess.TimeoutExpired:
        logger.debug(f"{config_path.name} 로드 시간 초과")
        return 0
    except Exception as e:
        logger.debug(f"{config_path.name} 로드 중 오류: {e}")
        return 0


def load_shell_env():
    """운영체제에 맞는 쉘 설정 파일에서 환경 변수를 로드"""
    config_files = get_shell_config_files()
    
    if not config_files:
        logger.debug("쉘 설정 파일을 찾을 수 없습니다.")
        return False
    
    total_loaded = 0
    loaded_files = []
    
    # 각 설정 파일을 순서대로 시도 (먼저 로드된 값이 우선)
    for config_path, shell_type in config_files:
        count = load_shell_config(config_path, shell_type)
        if count > 0:
            total_loaded += count
            loaded_files.append(f"{config_path.name} ({shell_type})")
    
    if total_loaded > 0:
        logger.info(f"{', '.join(loaded_files)}에서 {total_loaded}개의 환경 변수를 로드했습니다.")
        return True
    
    return False


def ensure_env_loaded():
    """환경 변수가 로드되었는지 확인하고, 없으면 쉘 설정 파일에서 로드"""
    # 필수 환경 변수 확인
    required_env_vars = {
        "bedrock": ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_BEDROCK_API_KEY"],
        "gemini": ["GOOGLE_API_KEY"],
        "openai": ["OPENAI_API_KEY"]
    }
    
    # 기본 모델 확인
    embedding_model = os.getenv("TEST_EMBEDDING_MODEL", "bedrock").lower()
    required_vars = required_env_vars.get(embedding_model, [])
    
    # 환경 변수가 모두 설정되어 있는지 확인
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        system = platform.system()
        logger.info(f"환경 변수가 설정되지 않아 쉘 설정 파일에서 로드를 시도합니다... ({system})")
        load_shell_env()
        
        # 다시 확인
        still_missing = [var for var in required_vars if not os.getenv(var)]
        if still_missing:
            logger.warning(f"여전히 설정되지 않은 환경 변수: {', '.join(still_missing)}")
            return False
    
    return True


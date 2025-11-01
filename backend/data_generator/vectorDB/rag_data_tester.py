#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
RAG 벡터 데이터베이스 테스트 스크립트
생성된 벡터 DB가 제대로 작동하는지 검증합니다.
"""

import os
import sys
from pathlib import Path
from typing import List, Dict, Any
import logging

# 프로젝트 루트 경로 추가
project_root = Path(__file__).parent.parent.parent.parent
sys.path.insert(0, str(project_root / "backend" / "data_generator" / "vectorDB"))

from langchain_community.vectorstores import FAISS

# 임베딩 모델 import
try:
    import boto3
    from langchain_aws import BedrockEmbeddings
    BEDROCK_AVAILABLE = True
except ImportError:
    BEDROCK_AVAILABLE = False

try:
    from langchain_google_genai import GoogleGenerativeAIEmbeddings
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False

try:
    from langchain_openai import OpenAIEmbeddings
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def initialize_embeddings(embedding_model: str = "bedrock"):
    """임베딩 모델 초기화"""
    embedding_model = embedding_model.lower()
    
    if embedding_model == "bedrock" or embedding_model == "titan":
        if not BEDROCK_AVAILABLE:
            raise ImportError(
                "AWS Bedrock 임베딩 모델을 사용하려면 'boto3'와 'langchain-aws' 패키지가 필요합니다."
            )
        
        access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
        secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY") or os.getenv("AWS_BEDROCK_API_KEY")
        region = os.getenv("AWS_DEFAULT_REGION", "ap-northeast-2")
        
        if not access_key_id or not secret_access_key:
            raise ValueError(
                "AWS Bedrock 자격 증명이 필요합니다. 환경 변수를 설정하세요."
            )
        
        bedrock_client = boto3.client(
            'bedrock-runtime',
            aws_access_key_id=access_key_id,
            aws_secret_access_key=secret_access_key,
            region_name=region
        )
        
        return BedrockEmbeddings(
            client=bedrock_client,
            model_id="amazon.titan-embed-text-v2:0"
        )
    
    elif embedding_model == "gemini":
        if not GEMINI_AVAILABLE:
            raise ImportError("Gemini 임베딩 모델 패키지가 필요합니다.")
        
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY 환경 변수가 필요합니다.")
        
        return GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=api_key
        )
    
    elif embedding_model == "openai":
        if not OPENAI_AVAILABLE:
            raise ImportError("OpenAI 임베딩 모델 패키지가 필요합니다.")
        
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY 환경 변수가 필요합니다.")
        
        return OpenAIEmbeddings(openai_api_key=api_key)
    
    else:
        raise ValueError(f"지원하지 않는 임베딩 모델: {embedding_model}")


def load_vector_db(db_path: Path, embeddings):
    """벡터 DB 로드"""
    if not db_path.exists():
        raise FileNotFoundError(f"벡터 DB를 찾을 수 없습니다: {db_path}")
    
    logger.info(f"벡터 DB 로드 중: {db_path}")
    vector_store = FAISS.load_local(
        str(db_path),
        embeddings,
        allow_dangerous_deserialization=True
    )
    
    logger.info("벡터 DB 로드 완료")
    return vector_store


def test_query(vector_store, query: str, k: int = 3) -> List[Dict[str, Any]]:
    """질문에 대한 유사 문서 검색"""
    logger.info(f"\n질문: {query}")
    logger.info("-" * 80)
    
    # 유사도 검색
    docs = vector_store.similarity_search_with_score(query, k=k)
    
    results = []
    for i, (doc, score) in enumerate(docs, 1):
        result = {
            "rank": i,
            "score": score,
            "content": doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content,
            "full_content": doc.page_content,
            "source_file": doc.metadata.get("file_name", "Unknown"),
            "metadata": doc.metadata
        }
        results.append(result)
        
        logger.info(f"\n[결과 {i}] (유사도 점수: {score:.4f})")
        logger.info(f"출처: {result['source_file']}")
        logger.info(f"내용: {result['content']}")
    
    return results


def run_tests():
    """RAG 벡터 DB 테스트 실행"""
    
    print("=" * 80)
    print("RAG 벡터 데이터베이스 테스트")
    print("=" * 80)
    
    # 경로 설정
    project_root = Path(__file__).parent.parent.parent.parent
    db_name = "law_db"
    db_path = project_root / "backend" / "data" / "RAG" / db_name
    
    # 기본 임베딩 모델 (벡터 DB 생성 시 사용한 모델)
    embedding_model = os.getenv("TEST_EMBEDDING_MODEL", "bedrock")
    
    try:
        # 임베딩 모델 초기화
        logger.info(f"임베딩 모델 초기화: {embedding_model}")
        embeddings = initialize_embeddings(embedding_model)
        
        # 벡터 DB 로드
        vector_store = load_vector_db(db_path, embeddings)
        
        # 벡터 DB 정보
        print(f"\n✅ 벡터 DB 로드 성공!")
        print(f"   경로: {db_path}")
        print(f"   임베딩 모델: {embedding_model}")
        
        # 요식업 관련 테스트 질문들 (간단한 검증용으로 질문 수 조정 가능)
        # TEST_QUICK 모드에서는 첫 번째 질문만 실행
        quick_mode = os.getenv("TEST_QUICK", "false").lower() == "true"
        
        test_questions = [
            "식품 위생법에서 요식업체가 준수해야 할 주요 사항은 무엇인가요?",
            "식품접객업소의 소화기 설치 기준은 어떻게 되나요?",
            "식품 판매업 허가 절차는 어떻게 진행되나요?",
            "음식점에서 부패변질 식품 판매 시 처벌 규정은 무엇인가요?",
            "다중이용업소에서 요식업을 운영할 때 필요한 안전 시설은 무엇인가요?"
        ]
        
        if quick_mode:
            logger.info("⚡ 빠른 테스트 모드: 첫 번째 질문만 실행합니다.")
            test_questions = test_questions[:1]
        
        print("\n" + "=" * 80)
        print("테스트 질문 실행")
        print("=" * 80)
        
        all_results = []
        for i, question in enumerate(test_questions, 1):
            print(f"\n{'=' * 80}")
            print(f"테스트 {i}/{len(test_questions)}")
            print(f"{'=' * 80}")
            
            results = test_query(vector_store, question, k=3)
            all_results.append({
                "question": question,
                "results": results
            })
            
            print("\n" + "-" * 80)
        
        # 테스트 결과 요약
        print("\n" + "=" * 80)
        print("테스트 결과 요약")
        print("=" * 80)
        
        total_queries = len(test_questions)
        successful_queries = sum(1 for r in all_results if r["results"])
        
        print(f"\n✅ 전체 테스트 질문 수: {total_queries}")
        print(f"✅ 성공한 검색 수: {successful_queries}")
        print(f"✅ 성공률: {(successful_queries/total_queries)*100:.1f}%")
        
        # 각 질문별 최고 점수 표시
        print("\n📊 질문별 최고 유사도 점수:")
        for i, result in enumerate(all_results, 1):
            if result["results"]:
                best_score = min(r["score"] for r in result["results"])  # 거리이므로 작을수록 좋음
                print(f"   질문 {i}: {best_score:.4f}")
            else:
                print(f"   질문 {i}: 결과 없음")
        
        # 출처 파일 통계
        all_sources = []
        for result in all_results:
            for r in result["results"]:
                all_sources.append(r["source_file"])
        
        from collections import Counter
        source_counts = Counter(all_sources)
        
        print("\n📁 검색 결과에 포함된 문서:")
        for source, count in source_counts.most_common():
            print(f"   - {source}: {count}회")
        
        print("\n" + "=" * 80)
        print("✅ 모든 테스트 완료!")
        print("=" * 80)
        
        return True
        
    except FileNotFoundError as e:
        logger.error(f"❌ 파일 오류: {e}")
        print("\n해결 방법:")
        print("  1. 벡터 DB가 생성되었는지 확인하세요")
        print("  2. DB 경로가 올바른지 확인하세요")
        return False
        
    except ValueError as e:
        logger.error(f"❌ 설정 오류: {e}")
        print("\n해결 방법:")
        if "자격 증명" in str(e) or "API 키" in str(e):
            if embedding_model == "bedrock":
                print("  - 환경 변수 설정:")
                print("    export AWS_ACCESS_KEY_ID='your-key'")
                print("    export AWS_BEDROCK_API_KEY='your-secret'")
                print("    export AWS_DEFAULT_REGION='ap-northeast-2'")
        return False
        
    except ImportError as e:
        logger.error(f"❌ 패키지 오류: {e}")
        print("\n해결 방법:")
        print("  - 필요한 패키지 설치: pip install -r requirements.txt")
        return False
        
    except Exception as e:
        logger.error(f"❌ 예상치 못한 오류: {e}", exc_info=True)
        return False


if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)


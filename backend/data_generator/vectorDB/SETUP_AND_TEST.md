# 설치 및 테스트 가이드

## 1. 패키지 설치

```bash
# py312 환경 활성화
conda activate py312

# 필요한 패키지 설치
cd backend/data_generator/vectorDB
pip install -r requirements.txt

# 사용할 임베딩 모델에 맞는 패키지 설치
# Gemini 사용 시
pip install langchain-google-genai

# OpenAI 사용 시  
pip install langchain-openai
```

## 2. 환경 변수 설정

### Gemini 사용 시
```bash
export GOOGLE_API_KEY="your-google-api-key"
```

### OpenAI 사용 시
```bash
export OPENAI_API_KEY="your-openai-api-key"
```

## 3. 테스트 실행

### 방법 1: 테스트 스크립트 사용
```bash
# 기본 테스트 (Gemini 사용)
python test_rag_generator.py

# OpenAI 사용
TEST_EMBEDDING_MODEL=openai python test_rag_generator.py
```

### 방법 2: 직접 실행
```bash
# 기본 사용 (Gemini)
python rag_data_generator.py test_db

# OpenAI 사용
python rag_data_generator.py test_db --embedding-model openai

# 도움말 보기
python rag_data_generator.py --help
```

## 4. 예상 출력

정상적으로 작동하면 다음과 같은 출력을 볼 수 있습니다:

```
============================================================
벡터 데이터베이스 생성 시작
  DB 이름: test_db
  소스 디렉토리: /path/to/docs/origin_src/law
  출력 디렉토리: /path/to/backend/data/RAG
============================================================
발견된 PDF 파일 수: 25
새로 처리할 파일 수: 25
새로운 벡터 DB 생성
PDF 처리 중: 개인정보 보호법(법률)(제20897호)(20251002).pdf
  → 50 페이지에서 120 개 청크 생성
...
벡터 DB에 3000 개 청크 추가 중...
벡터 DB 저장 완료: /path/to/backend/data/RAG/test_db
메타데이터 저장 완료: /path/to/backend/data/RAG/test_db_metadata.json
============================================================
벡터 데이터베이스 생성 완료!
============================================================
✅ 작업이 성공적으로 완료되었습니다!
```

## 5. 문제 해결

### 패키지 설치 오류
```bash
# pip 업그레이드
pip install --upgrade pip

# 개별 패키지 설치
pip install langchain langchain-community faiss-cpu pypdf
```

### API 키 오류
- 환경 변수가 제대로 설정되었는지 확인: `echo $GOOGLE_API_KEY`
- `.env` 파일 사용 시 `python-dotenv` 설치 및 코드 수정 필요

### PDF 파일 읽기 오류
- PDF 파일이 손상되었는지 확인
- 파일 경로가 올바른지 확인


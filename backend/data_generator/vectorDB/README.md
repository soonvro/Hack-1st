# RAG 데이터 생성기

PDF 파일들을 읽어 임베딩하여 FAISS 벡터 데이터베이스에 저장하는 도구입니다.

## 기능

- 📄 PDF 파일 자동 처리
- 🔄 기존 벡터 DB에 새 문서 추가 지원
- 🚫 중복 처리 방지 (이미 처리된 파일 자동 스킵)
- 🔌 유연한 임베딩 모델 지원 (Gemini, OpenAI)
- 📊 처리 상태 메타데이터 관리

## 설치

```bash
# 필요한 패키지 설치
pip install -r requirements.txt

# 사용할 임베딩 모델 선택에 따라 설치
# Gemini 사용 시
pip install langchain-google-genai

# OpenAI 사용 시
pip install langchain-openai
```

## 환경 변수 설정

### Gemini 사용 시
```bash
export GOOGLE_API_KEY="your-google-api-key"
```

### OpenAI 사용 시
```bash
export OPENAI_API_KEY="your-openai-api-key"
```

## 사용 방법

### 명령줄 인터페이스

```bash
# 기본 사용 (Gemini 임베딩, 기본 경로)
python rag_data_generator.py law_db

# OpenAI 임베딩 사용
python rag_data_generator.py law_db --embedding-model openai

# 커스텀 소스 디렉토리 지정
python rag_data_generator.py law_db --source-dir /path/to/pdfs

# 커스텀 출력 디렉토리 지정
python rag_data_generator.py law_db --output-dir /path/to/output

# API 키 직접 지정
python rag_data_generator.py law_db --api-key "your-api-key"

# 청크 크기 조정
python rag_data_generator.py law_db --chunk-size 1500 --chunk-overlap 300
```

### Python 코드에서 사용

```python
from rag_data_generator import RAGDataGenerator

# 생성기 초기화 (Gemini 사용)
generator = RAGDataGenerator(
    embedding_model="gemini",
    chunk_size=1000,
    chunk_overlap=200
)

# 벡터 DB 생성
generator.generate_vector_db(
    db_name="law_db",
    source_dir="docs/origin_src/law",  # 선택사항
    output_dir="backend/data/RAG"       # 선택사항
)
```

## 기본 경로

- **소스 디렉토리**: `docs/origin_src/law/`
- **출력 디렉토리**: `backend/data/RAG/`

## 파일 구조

```
backend/data/RAG/
├── law_db/                    # 벡터 DB 파일들
│   ├── index.faiss
│   └── index.pkl
└── law_db_metadata.json        # 처리된 파일 메타데이터
```

## 중복 처리 방지

스크립트는 각 PDF 파일의 해시값과 파일 메타데이터를 저장하여 이미 처리된 파일을 자동으로 건너뜁니다. 파일이 수정된 경우에만 다시 처리됩니다.

## 에러 처리

스크립트는 명확한 에러 메시지를 제공합니다:

- **API 키 누락**: 환경 변수 설정 안내
- **패키지 누락**: 필요한 패키지 설치 안내
- **파일 없음**: 파일 경로 확인 안내
- **벡터 DB 로드 실패**: 새로 생성 또는 문제 해결 안내

## 테스트

```bash
# 테스트 스크립트 실행
python test_rag_generator.py

# 임베딩 모델 지정
TEST_EMBEDDING_MODEL=openai python test_rag_generator.py
```


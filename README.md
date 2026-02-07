# DocuMind AI

DocuMind AI is a production-ready Multi-Modal Document Intelligence System that combines Computer Vision, OCR, LLM reasoning, and Multi-Agent orchestration to process and understand complex documents.

## Features
- **Multi-Modal Pipeline**: Process PDFs and images using CV and OCR.
- **Layout Analysis**: Detect tables, figures, and text regions using YOLO/OpenCV.
- **Multi-Agent Orchestration**: Powered by LangGraph (Vision, Text, Fusion, and Validation Agents).
- **Multi-Modal RAG**: Hybrid retrieval using Qdrant vector database.
- **Confidence Scoring**: Cross-validation between vision and text agents.

## Tech Stack
- **Backend**: FastAPI
- **CV**: OpenCV, YOLO
- **OCR**: EasyOCR
- **Agents**: LangGraph
- **Vector DB**: Qdrant
- **LLM**: GPT-4V / Claude 3

## Project Structure
```text
documind-ai/
├── cv/          # Computer Vision & Layout Analysis
├── ocr/         # OCR & Text Extraction
├── agents/      # LangGraph Agents
├── rag/         # Vector DB & Retrieval
├── validation/  # Confidence & Validation logic
├── api/         # FastAPI Endpoints
├── tests/       # Unit & Integration Tests
└── data/        # Sample documents & processed outputs
```

## Getting Started
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Set up environment variables in `.env`.
3. Run the API:
   ```bash
   uvicorn api.main:app --reload
   ```

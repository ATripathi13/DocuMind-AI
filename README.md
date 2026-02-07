# DocuMind AI

DocuMind AI is a production-ready Multi-Modal Document Intelligence System that combines Computer Vision, OCR, LLM reasoning, and Multi-Agent orchestration to process and understand complex documents.

## Project Structure
```text
documind-ai/
├── backend/     # Backend API, Agents, and CV/OCR Logic
│   ├── agents/  # LangGraph Agents
│   ├── api/     # FastAPI Endpoints
│   ├── cv/      # Computer Vision & Layout Analysis
│   ├── data/    # Sample documents & processed outputs
│   ├── ocr/     # OCR & Text Extraction
│   ├── rag/     # Vector DB & Retrieval
│   ├── tests/   # Unit & Integration Tests
│   └── validation/ # Confidence & Validation logic
└── frontend/    # React + Vite Dashboard
```

## Getting Started

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn api.main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Features
- **Multi-Modal Pipeline**: Process PDFs and images using CV and OCR.
- **Layout Analysis**: Detect tables, figures, and text regions using YOLO/OpenCV.
- **Multi-Agent Orchestration**: Powered by LangGraph (Vision, Text, Fusion, and Validation Agents).
- **Multi-Modal RAG**: Hybrid retrieval using Qdrant vector database.
- **Interactive Dashboard**: High-fidelity React dashboard for visualization and analysis.

## Tech Stack
- **Backend**: FastAPI, OpenCV, YOLO, EasyOCR, LangGraph, Qdrant.
- **Frontend**: React, Vite, Tailwind CSS, Zustand, Recharts, Konva.

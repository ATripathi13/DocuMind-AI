from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
import uuid
import shutil
from pathlib import Path

# Module Imports
from api.utils import DocProcessor
from ocr.engine import OCREngine
from cv.layout import LayoutAnalyzer
from agents.orchestrator import DocuMindOrchestrator
from agents.vision import VisionAgent
from agents.text import TextAgent
from agents.fusion import FusionAgent
from agents.validation import ValidationAgent
from rag.engine import RAGSystem

app = FastAPI(title="DocuMind AI", version="1.0.0")

# Mount data directory for static file access
if not os.path.exists("data"):
    os.makedirs("data")
app.mount("/data", StaticFiles(directory="data"), name="data")

# Initialize components
doc_processor = DocProcessor()
ocr_engine = OCREngine()
layout_analyzer = LayoutAnalyzer()
rag_system = RAGSystem()

# Initialize Agents
vision_agent = VisionAgent(layout_analyzer)
text_agent = TextAgent(ocr_engine)
fusion_agent = FusionAgent()
validation_agent = ValidationAgent()

# Initialize Orchestrator
orchestrator = DocuMindOrchestrator(vision_agent, text_agent, fusion_agent, validation_agent)

class ProcessResponse(BaseModel):
    document_id: str
    status: str
    confidence_score: float
    message: str

@app.get("/")
async def root():
    return {"message": "Welcome to DocuMind AI API", "docs": "/docs"}

@app.post("/process-doc", response_model=ProcessResponse)
async def process_document(file: UploadFile = File(...)):
    doc_id = str(uuid.uuid4())
    temp_dir = Path(f"data/temp/{doc_id}")
    temp_dir.mkdir(parents=True, exist_ok=True)
    
    file_path = temp_dir / file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # 1. Process document to images
        image_paths = doc_processor.pdf_to_images(str(file_path))
        
        # 2. Run Multi-Agent Orchestration
        state = await orchestrator.process(str(file_path), image_paths)
        
        # 3. Index in RAG system
        # Flatten text for RAG
        all_text = [p["full_text"] for p in state["text_data"]]
        # We could also index image features/blocks here
        rag_system.add_document(doc_id, all_text, [])
        
        return {
            "document_id": doc_id,
            "status": "completed",
            "confidence_score": state["confidence_score"],
            "message": "Document processed and indexed successfully."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask")
async def ask_question(question: str, document_id: str):
    try:
        context = rag_system.query(question)
        # In a real system, we'd pass this context + question to an LLM
        return {
            "question": question,
            "context": context,
            "answer": "Answer based on retrieved context." if context else "No context found."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/confidence")
async def get_confidence(document_id: str):
    # In a real system, we might retrieve this from a DB
    return {"document_id": document_id, "confidence_score": 0.0, "status": "mocked"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

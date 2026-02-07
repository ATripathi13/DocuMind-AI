import pytest
from api.utils import DocProcessor
from ocr.engine import OCREngine
import os

def test_doc_processor_init():
    processor = DocProcessor(output_dir="data/test_output")
    assert os.path.exists("data/test_output")

def test_ocr_engine_init():
    # EasyOCR might take time to download models, so we just test init
    engine = OCREngine()
    assert engine is not None

# Integration tests would require sample files which we don't have yet

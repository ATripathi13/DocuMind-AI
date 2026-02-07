import easyocr
import numpy as np

class OCREngine:
    def __init__(self, languages=['en']):
        self.reader = easyocr.Reader(languages)

    def extract_text(self, image_path: str):
        """Extracts text with bounding boxes from an image."""
        results = self.reader.readtext(image_path)
        
        extracted_data = []
        for (bbox, text, prob) in results:
            extracted_data.append({
                "text": text,
                "confidence": prob,
                "bbox": [list(map(int, point)) for point in bbox]
            })
            
        return extracted_data

    def get_full_text(self, extracted_data: list):
        """Returns the full text reconstructed from blocks."""
        return "\n".join([item["text"] for item in extracted_data])

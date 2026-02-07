import os
from pdf2image import convert_from_path
import cv2
import numpy as np
from pathlib import Path

class DocProcessor:
    def __init__(self, output_dir: str = "data/processed"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def pdf_to_images(self, pdf_path: str):
        """Converts PDF pages to images."""
        images = convert_from_path(pdf_path)
        image_paths = []
        doc_name = Path(pdf_path).stem
        
        for i, image in enumerate(images):
            image_path = self.output_dir / f"{doc_name}_page_{i+1}.jpg"
            image.save(image_path, "JPEG")
            image_paths.append(str(image_path))
            
        return image_paths

    def preprocess_image(self, image_path: str):
        """Basic image preprocessing for better OCR/Detection."""
        image = cv2.imread(image_path)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # Apply thresholding or denoising if needed
        return gray

    def save_processed_block(self, image: np.ndarray, block_name: str, doc_id: str):
        """Saves a specific document block (table, figure) as an image."""
        output_path = self.output_dir / f"{doc_id}_{block_name}.jpg"
        cv2.imwrite(str(output_path), image)
        return str(output_path)

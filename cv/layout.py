import cv2
import numpy as np
from ultralytics import YOLO

class LayoutAnalyzer:
    def __init__(self, model_path: str = None):
        """
        Initializes the layout analyzer. 
        If model_path is provided, it uses YOLO for detection.
        Otherwise, it falls back to OpenCV contour detection.
        """
        self.model = None
        if model_path:
            self.model = YOLO(model_path)

    def detect_blocks(self, image_path: str):
        """Detects layout blocks (tables, figures, text regions)."""
        image = cv2.imread(image_path)
        
        if self.model:
            results = self.model(image)
            # Process YOLO results
            blocks = []
            for r in results:
                for box in r.boxes:
                    blocks.append({
                        "type": r.names[int(box.cls)],
                        "bbox": box.xyxy[0].tolist(),
                        "confidence": float(box.conf)
                    })
            return blocks
        else:
            # Fallback to OpenCV contour detection for tables/blocks
            return self._opencv_fallback(image)

    def _opencv_fallback(self, image):
        """Uses OpenCV to detect potential blocks based on contours."""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

        # Dilate to join text fragments
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (15, 15))
        dilate = cv2.dilate(thresh, kernel, iterations=2)

        # Find contours
        cnts = cv2.findContours(dilate, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cnts = cnts[0] if len(cnts) == 2 else cnts[1]

        blocks = []
        for c in cnts:
            x, y, w, h = cv2.boundingRect(c)
            if w > 50 and h > 20: # Filter small noise
                blocks.append({
                    "type": "detected_region",
                    "bbox": [x, y, x + w, y + h],
                    "confidence": 0.5 # Default confidence for fallback
                })
        
        return blocks

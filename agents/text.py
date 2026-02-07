from ocr.engine import OCREngine

class TextAgent:
    def __init__(self, engine: OCREngine):
        self.engine = engine

    def run(self, state):
        print("Text Agent: Extracting text...")
        image_paths = state.get("image_paths", [])
        all_text_data = []
        
        for path in image_paths:
            text_blocks = self.engine.extract_text(path)
            full_text = self.engine.get_full_text(text_blocks)
            all_text_data.append({
                "image_path": path,
                "text_blocks": text_blocks,
                "full_text": full_text
            })
            
        state["text_data"] = all_text_data
        state["current_agent"] = "text_agent"
        return state

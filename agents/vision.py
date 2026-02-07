from cv.layout import LayoutAnalyzer

class VisionAgent:
    def __init__(self, analyzer: LayoutAnalyzer):
        self.analyzer = analyzer

    def run(self, state):
        print("Vision Agent: Analyzing layout...")
        image_paths = state.get("image_paths", [])
        all_blocks = []
        
        for path in image_paths:
            blocks = self.analyzer.detect_blocks(path)
            all_blocks.append({
                "image_path": path,
                "blocks": blocks
            })
            
        state["vision_data"] = all_blocks
        state["current_agent"] = "vision_agent"
        return state

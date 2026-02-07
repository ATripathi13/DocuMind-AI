from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import os

class FusionAgent:
    def __init__(self, model_name="gpt-4o"):
        self.llm = None
        if os.getenv("OPENAI_API_KEY"):
            self.llm = ChatOpenAI(model=model_name)

    def run(self, state):
        print("Fusion Agent: Fusing vision and text data...")
        vision_data = state.get("vision_data", [])
        text_data = state.get("text_data", [])
        openai_key = state.get("openai_key")
        
        # Dynamically initialize model if key is provided
        if openai_key:
            self.llm = ChatOpenAI(model="gpt-4o", openai_api_key=openai_key)
        elif os.getenv("OPENAI_API_KEY"):
            self.llm = ChatOpenAI(model="gpt-4o")
        
        fused_results = []
        for v_page, t_page in zip(vision_data, text_data):
            page_fusion = {
                "image_path": v_page["image_path"],
                "merged_blocks": self._merge(v_page["blocks"], t_page["text_blocks"])
            }
            fused_results.append(page_fusion)
            
        state["fusion_data"] = {"pages": fused_results}
        state["current_agent"] = "fusion_agent"
        return state

    def _merge(self, vision_blocks, text_blocks):
        """Merges text content into detected layout blocks using spatial proximity."""
        merged = []
        for v_block in vision_blocks:
            v_bbox = v_block["bbox"]
            contained_text = []
            
            for t_block in text_blocks:
                t_bbox = t_block["bbox"]
                # Simple overlap check
                if self._is_inside(t_bbox, v_bbox):
                    contained_text.append(t_block["text"])
            
            merged.append({
                "type": v_block["type"],
                "bbox": v_bbox,
                "text": " ".join(contained_text),
                "confidence": v_block["confidence"]
            })
        return merged

    def _is_inside(self, inner_bbox, outer_bbox):
        """Check if inner bbox is roughly inside outer bbox."""
        # inner_bbox: [[x1,y1],[x2,y2],[x3,y3],[x4,y4]]
        # outer_bbox: [x1, y1, x2, y2]
        ix1 = min(p[0] for p in inner_bbox)
        iy1 = min(p[1] for p in inner_bbox)
        ix2 = max(p[0] for p in inner_bbox)
        iy2 = max(p[1] for p in inner_bbox)
        
        ox1, oy1, ox2, oy2 = outer_bbox
        
        # Allow some margin
        return ix1 >= ox1 - 5 and iy1 >= oy1 - 5 and ix2 <= ox2 + 5 and iy2 <= oy2 + 5

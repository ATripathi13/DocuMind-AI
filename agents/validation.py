class ValidationAgent:
    def __init__(self):
        pass

    def run(self, state):
        print("Validation Agent: Scoring confidence and validating consistency...")
        vision_data = state.get("vision_data", [])
        text_data = state.get("text_data", [])
        fusion_data = state.get("fusion_data", {})

        # Calculate Text Quality (average OCR confidence)
        text_quality = self._calculate_text_quality(text_data)
        
        # Calculate Visual Detection Score
        visual_score = self._calculate_visual_score(vision_data)
        
        # Calculate Fusion Consistency (how well text matched blocks)
        fusion_consistency = self._calculate_fusion_consistency(fusion_data)
        
        # confidence = 0.4 * text_quality + 0.3 * visual_detection_score + 0.3 * fusion_consistency
        overall_confidence = (0.4 * text_quality) + (0.3 * visual_score) + (0.3 * fusion_consistency)
        
        state["confidence_score"] = round(overall_confidence, 2)
        state["validation_results"] = {
            "text_quality": text_quality,
            "visual_score": visual_score,
            "fusion_consistency": fusion_consistency,
            "checks": {
                "text_table_consistency": True, # Placeholder
                "ocr_match_region": fusion_consistency > 0.7
            }
        }
        state["current_agent"] = "validation_agent"
        return state

    def _calculate_text_quality(self, text_data):
        if not text_data: return 0.0
        probs = []
        for page in text_data:
            for block in page["text_blocks"]:
                probs.append(block["confidence"])
        return sum(probs) / len(probs) if probs else 1.0

    def _calculate_visual_score(self, vision_data):
        if not vision_data: return 0.0
        confs = []
        for page in vision_data:
            for block in page["blocks"]:
                confs.append(block["confidence"])
        return sum(confs) / len(confs) if confs else 1.0

    def _calculate_fusion_consistency(self, fusion_data):
        if not fusion_data or "pages" not in fusion_data: return 0.0
        # Check percentage of blocks that have text
        total_blocks = 0
        blocks_with_text = 0
        for page in fusion_data["pages"]:
            for block in page["merged_blocks"]:
                total_blocks += 1
                if block["text"].strip():
                    blocks_with_text += 1
        return blocks_with_text / total_blocks if total_blocks > 0 else 1.0

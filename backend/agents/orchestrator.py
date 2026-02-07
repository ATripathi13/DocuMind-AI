from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    """Represents the state of the document analysis pipeline."""
    document_path: str
    image_paths: List[str]
    vision_data: List[Dict[str, Any]]
    text_data: List[Dict[str, Any]]
    fusion_data: Dict[str, Any]
    validation_results: Dict[str, Any]
    confidence_score: float
    current_agent: str

class DocuMindOrchestrator:
    def __init__(self, vision_agent, text_agent, fusion_agent, validation_agent):
        self.vision_agent = vision_agent
        self.text_agent = text_agent
        self.fusion_agent = fusion_agent
        self.validation_agent = validation_agent
        self.workflow = self._create_workflow()

    def _create_workflow(self):
        workflow = StateGraph(AgentState)

        # Define the nodes
        workflow.add_node("vision_agent", self.vision_agent.run)
        workflow.add_node("text_agent", self.text_agent.run)
        workflow.add_node("fusion_agent", self.fusion_agent.run)
        workflow.add_node("validation_agent", self.validation_agent.run)

        # Define the edges
        workflow.set_entry_point("vision_agent")
        workflow.add_edge("vision_agent", "text_agent")
        workflow.add_edge("text_agent", "fusion_agent")
        workflow.add_edge("fusion_agent", "validation_agent")
        workflow.add_edge("validation_agent", END)

        return workflow.compile()

    async def process(self, document_path: str, image_paths: List[str]):
        initial_state = {
            "document_path": document_path,
            "image_paths": image_paths,
            "vision_data": [],
            "text_data": [],
            "fusion_data": {},
            "validation_results": {},
            "confidence_score": 0.0,
            "current_agent": "vision_agent"
        }
        return await self.workflow.ainvoke(initial_state)

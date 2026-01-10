from pydantic import BaseModel
from typing import List, Optional


class DecisionResult(BaseModel):
    score: int
    decision: str
    confidence: str
    explanations: Optional[List[str]] = []

from pydantic import BaseModel
from typing import List


class TextAnalysisResult(BaseModel):
    credential_keywords: int
    urgency_keywords: int
    threat_keywords: int
    action_keywords: int
    threat_phrases: bool
    brand_mentions: List[str]

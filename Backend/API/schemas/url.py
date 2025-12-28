from pydantic import BaseModel, HttpUrl
from typing import Optional
class URLScanRequest(BaseModel):
    url: str


class URLScanResponse(BaseModel):
    url: str
    is_phishing: Optional[bool] = None
    risk_score: Optional[float] = None  # 0.0 – 1.0 or 0 – 100
    confidence: Optional[float] = None

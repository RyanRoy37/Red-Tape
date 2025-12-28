from pydantic import BaseModel, HttpUrl
from typing import Optional
class URLScanRequest(BaseModel):
    url: str


class URLScanResponse(BaseModel):
    url: str
    is_phishing: bool
    risk_score: float
    confidence: str

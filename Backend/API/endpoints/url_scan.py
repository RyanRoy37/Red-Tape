# app/api/v1/url_scan.py

from fastapi import APIRouter
from schemas.url import URLScanRequest, URLScanResponse
from evaluation.prediction import predict

router = APIRouter()

@router.post("/scan-url", response_model=URLScanResponse)
def scan_url(payload: URLScanRequest):
    url = str(payload.url)
    result = predict(url)
    response = URLScanResponse(
        url=url,
        is_phishing=(result["prediction"] == "phishing"),
        risk_score=result.get("risk_score"),
        confidence=result.get("confidence")
    )

    return response
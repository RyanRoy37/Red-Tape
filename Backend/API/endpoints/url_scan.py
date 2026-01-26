# app/api/v1/url_scan.py

from fastapi import APIRouter
from schemas.url import URLScanRequest, URLScanResponse
from evaluation.prediction import predict
from evaluation.scoring_engine import content_scan
router = APIRouter()

@router.post("/scan_url", response_model=URLScanResponse)
def scan_url(payload: URLScanRequest):
    url = str(payload.url)

    url_result = predict(url)  # URL-based ML or heuristics
    content_result = content_scan(url)
    print(content_result["confidence"])
    print(content_result["risk_score"])
    if content_result["decision"] == "phishing":
        return URLScanResponse(
        url=url,
        is_phishing=True,
        risk_score=round(content_result["risk_score"], 2),
        confidence=content_result["confidence"],
        explanations=content_result.get("explanations", [])
        )

    # Otherwise, do weighted fusion
    final_risk = (
        0.35 * url_result["risk_score"] +
        0.65 * content_result["risk_score"]
    )
    if final_risk >= 60:
        decision = "phishing"
        confidence = "high"
    elif final_risk >= 40:
        decision = "suspicious"
        confidence = "medium"
    else:
        decision = "legitimate"
        confidence = "low"

    return URLScanResponse(
    url=url,
    is_phishing=(decision == "phishing"),
    risk_score=round(final_risk, 2),
    confidence=confidence,
    explanations=content_result.get("explanations", [])
    )

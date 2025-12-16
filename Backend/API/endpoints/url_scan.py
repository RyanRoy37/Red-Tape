# app/api/v1/url_scan.py

from fastapi import APIRouter
from schemas.url import URLScanRequest, URLScanResponse

router = APIRouter()

@router.post("/scan-url", response_model=URLScanResponse)
def scan_url(payload: URLScanRequest):
    """
    Receives a URL from frontend and returns a placeholder response.
    Logic will be added later.
    """
    return URLScanResponse(
        url=payload.url,
        message="URL received successfully"
    )

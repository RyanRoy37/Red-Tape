# app/main.py

from fastapi import FastAPI
from endpoints.url_scan import router as url_scan_router

app = FastAPI(
    title="Red- Tape",
    description="API to analyze URLs for phishing detection",
    version="1.0.0"
)

app.include_router(
    url_scan_router,
    prefix="/endpoints",
    tags=["URL Analysis"]
)

@app.get("/")
def health_check():
    return {"status": "running"}

from fastapi import FastAPI
from endpoints.url_scan import router as url_scan_router
from dotenv import load_dotenv
load_dotenv(override=True)

app = FastAPI(
    title="Red-Tape",
    description="API to analyze URLs for phishing detection",
    version="1.0.0"
)


from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,   # MUST be false with "*"
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    url_scan_router,
    prefix="/endpoints",
    tags=["URL Analysis"]
)

from endpoints.ai_explain import router as ai_explain_router
app.include_router(ai_explain_router, prefix="/endpoints", tags=["AI Explain"])


@app.get("/")
def health_check():
    return {"status": "running"}

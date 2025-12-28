from fastapi import APIRouter
from pydantic import BaseModel
import os
import google.generativeai as genai
from dotenv import load_dotenv

router = APIRouter()
load_dotenv(override=True)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


class ExplainRequest(BaseModel):
    url: str
    is_phishing: bool
    risk_score: int
    confidence: str
    explanations: list[str]

@router.post("/ai-explain")
def ai_explain(payload: ExplainRequest):
    response = generate_explanation(
        payload.is_phishing,
        payload.confidence,
        payload.risk_score,
        payload.explanations
    )

    return {
        "explanation": response
    }

def generate_explanation(decision, confidence, risk_score, explanations):
    prompt = f"""
You are explaining the result of a phishing detection system.

Decision: {decision}
Confidence: {confidence}
Risk score: {risk_score}

Triggered signals:
- {"; ".join(explanations)}

Explain this in simple, formal language.
Write at most 3 short sentences.
Do not add new reasons.
"""

    response = model.generate_content(
        prompt,
        generation_config={
            "temperature": 0.2,
            "max_output_tokens": 120
        }
    )

    candidate = response.candidates[0]

    # ✅ Only accept clean completions
    if candidate.finish_reason.name != "STOP":
        return (
            "This website was classified based on multiple automated risk indicators. "
            "The detected signals are commonly associated with phishing activity. "
            "The site should be treated as unsafe."
        )

    return candidate.content.parts[0].text.strip()

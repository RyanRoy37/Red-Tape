from .dom_analysis import analyze_dom_structure, fetch_and_parse
from .js_analysis import analyze_js_behavior
from .text_analysis import analyze_text_language
from evaluation.visual_analysis import analyze_visual_structure   


def content_scan(url: str) -> dict:
    html, final_url, status_code = fetch_and_parse(url)

    if html is None or status_code in [403, 404, 410]:
        return {
            "risk_score": 60,
            "decision": "suspicious",
            "confidence": "medium",
            "reason": "Page unavailable or blocked"
        }

    dom = analyze_dom_structure(html, final_url)
    js = analyze_js_behavior(html, final_url)
    text = analyze_text_language(html)
    visual = analyze_visual_structure(html, final_url)

    features = merge_features(dom, text, js, visual)
    result = score_page(features)

    content_score = min((result["score"] / 10) * 100, 100)

    return {
        "risk_score": content_score,
        "decision": result["decision"],
        "confidence": result["confidence"]
    }



def merge_features(
    dom_features: dict,
    text_features: dict,
    js_features: dict,
    visual_features: dict
) -> dict:
    """
    Merge outputs from Pillar 1–4 into a single flat feature map
    to be consumed by the scoring engine.
    """

    features = {
        "has_password_field": dom_features.get("has_password_field", False),
        "external_form_action": dom_features.get("external_form_action", False),
        "iframe_count": dom_features.get("iframe_count", 0),
        "missing_footer": dom_features.get("missing_footer", False),
        "urgency_keywords": text_features.get("urgency_keywords", 0),
        "js_redirect": js_features.get("js_redirect", False),
        "single_page_login": visual_features.get("single_page_login", False),
        "phishing_intent_language": text_features.get("phishing_intent_language", False),

    }

    return features


def score_page(features: dict) -> dict:
    print("FEATURES RECEIVED:", features)
    score = 0
    explanations = []


    if features.get("has_password_field"):
        score += 3
        explanations.append("Password input field detected (+3)")

    if features.get("external_form_action"):
        score += 2
        explanations.append("Form submits to external domain (+2)")

    if features.get("phishing_intent_language"):
        score += 3
        explanations.append("Phishing intent language detected (+3)")

    if features.get("urgency_keywords", 0) > 0:
        score += 2
        explanations.append("Urgency language detected (+2)")

    # Escalation: social engineering without login
    if (features.get("phishing_intent_language") and not features.get("has_password_field")):
        score += 2
        explanations.append("Social engineering without login escalation (+2)")


    if features.get("js_redirect"):
        score += 2
        explanations.append("JavaScript-based redirect detected (+2)")

    if features.get("iframe_count", 0) > 0:
        score += 1
        explanations.append("Embedded iframe detected (+1)")

    if features.get("missing_footer"):
        score += 1
        explanations.append("Missing footer / policy section (+1)")

    THRESHOLD = 6

    if score >= THRESHOLD:
        decision = "phishing"
        confidence = (
            "high" if score >= 8 else
            "medium"
        )
    else:
        decision = "legitimate"
        confidence = "low"

    return {
        "score": score,
        "decision": decision,
        "confidence": confidence,
        "explanations": explanations
    }

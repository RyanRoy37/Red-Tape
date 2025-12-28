import re
from bs4 import BeautifulSoup
from collections import Counter

CREDENTIAL_KEYWORDS = {
    "login", "log in", "signin", "sign in",
    "password", "passcode", "otp", "pin", "credentials"
}

URGENCY_KEYWORDS = {
    "urgent", "immediately", "asap", "now",
    "within", "limited time", "act fast"
}

THREAT_KEYWORDS = {
    "suspended", "locked", "disabled",
    "terminated", "blocked", "restricted"
}

ACTION_KEYWORDS = {
    "verify", "update", "confirm",
    "validate", "secure", "reset"
}

BRAND_KEYWORDS = {
    "paypal", "google", "apple", "amazon",
    "microsoft", "facebook", "instagram", "bank"
}
PHISHING_INTENT_PHRASES = [
    "verify your account",
    "account suspended",
    "account compromised",
    "unusual activity detected",
    "confirm your identity",
    "security alert",
    "click below to continue",
     "phishing",
    "social engineering",
    "trick you",
    "out-of-date",
    "update",
    "mimics",
    "does not actually originate"
]



def extract_visible_text(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")

    # Remove scripts and styles
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    text = soup.get_text(separator=" ")
    text = re.sub(r"\s+", " ", text)
    return text.lower().strip()


def count_keywords(text: str, keyword_set: set) -> int:
    count = 0
    for word in keyword_set:
        count += len(re.findall(rf"\b{re.escape(word)}\b", text))
    return count


def detect_phrase_patterns(text: str) -> bool:
    patterns = [
        r"verify.*account",
        r"update.*password",
        r"confirm.*identity",
        r"secure.*account",
        r"reset.*password"
    ]

    for pattern in patterns:
        if re.search(pattern, text):
            return True
    return False


def detect_brand_mentions(text: str) -> list:
    detected = []
    for brand in BRAND_KEYWORDS:
        if re.search(rf"\b{brand}\b", text):
            detected.append(brand)
    return detected


def detect_phishing_intent(text: str) -> bool:
    for phrase in PHISHING_INTENT_PHRASES:
        if phrase in text:
            return True
    return False

def analyze_text_language(html: str) -> dict:
    text = extract_visible_text(html)

    credential_count = count_keywords(text, CREDENTIAL_KEYWORDS)
    urgency_count = count_keywords(text, URGENCY_KEYWORDS)
    threat_count = count_keywords(text, THREAT_KEYWORDS)
    action_count = count_keywords(text, ACTION_KEYWORDS)
    threat_phrases = detect_phrase_patterns(text)
    brand_mentions = detect_brand_mentions(text)
    print("TEXT LENGTH:", len(text))
    print("TEXT PREVIEW:", text[:300])

    return {
        "credential_keywords": credential_count,
        "urgency_keywords": urgency_count,
        "threat_keywords": threat_count,
        "action_keywords": action_count,
        "threat_phrases": threat_phrases,
        "brand_mentions": brand_mentions,
        "phishing_intent_language": detect_phishing_intent(text)

    }

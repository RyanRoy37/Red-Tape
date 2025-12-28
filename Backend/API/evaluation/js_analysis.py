import re
import math
from bs4 import BeautifulSoup
from urllib.parse import urljoin

REDIRECT_PATTERNS = [
    r"window\.location",
    r"location\.href",
    r"location\.replace",
    r"setTimeout\s*\(.*location",
    r"setInterval\s*\(.*location"
]

INPUT_LISTENER_PATTERNS = [
    r"onkeypress",
    r"onkeydown",
    r"oninput",
    r"addEventListener\s*\(\s*[\"']input[\"']",
    r"addEventListener\s*\(\s*[\"']keydown[\"']"
]

ENCODED_CHAR_PATTERN = r"(\\x[0-9a-fA-F]{2}|%[0-9a-fA-F]{2})"


def shannon_entropy(s: str) -> float:
    """Calculate Shannon entropy of a string"""
    if not s:
        return 0.0

    freq = {}
    for c in s:
        freq[c] = freq.get(c, 0) + 1

    entropy = 0
    for count in freq.values():
        p = count / len(s)
        entropy -= p * math.log2(p)

    return entropy


def analyze_js_behavior(html: str, base_url: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")

    scripts = soup.find_all("script")

    inline_scripts = []
    external_scripts = []

    for script in scripts:
        if script.get("src"):
            external_scripts.append(urljoin(base_url, script["src"]))
        else:
            inline_scripts.append(script.get_text())

    combined_js = " ".join(inline_scripts)

    #  REDIRECT DETECTION
    js_redirect = any(
        re.search(pattern, combined_js)
        for pattern in REDIRECT_PATTERNS
    )

    #  INPUT MONITORING
    input_listeners = any(
        re.search(pattern, combined_js)
        for pattern in INPUT_LISTENER_PATTERNS
    )

    #  OBFUSCATION DETECTION 
    encoded_strings = re.findall(ENCODED_CHAR_PATTERN, combined_js)
    high_entropy_strings = [
        token for token in re.findall(r"[A-Za-z0-9+/=]{20,}", combined_js)
        if shannon_entropy(token) > 4.5
    ]

    long_variable_names = re.findall(r"\b[a-zA-Z_$][a-zA-Z0-9_$]{30,}\b", combined_js)

    obfuscated_js = (
        len(encoded_strings) > 10 or
        len(high_entropy_strings) > 3 or
        len(long_variable_names) > 5
    )

    return {
        "js_redirect": js_redirect,
        "input_listeners": input_listeners,
        "obfuscated_js": obfuscated_js
    }

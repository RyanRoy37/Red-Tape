import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Phishing-Detection-Bot)"
}

TIMEOUT = 10

def fetch_and_parse(url: str):
    html, final_url, status_code = fetch_html(url)
    return html, final_url, status_code


def fetch_html(url: str, timeout=10):
    try:
        response = requests.get(
            url,
            timeout=timeout,
            allow_redirects=True,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/120.0.0.0 Safari/537.36"
                ),
                "Accept": "text/html,application/xhtml+xml",
            }
        )
        return response.text, response.url, response.status_code
    except requests.RequestException:
        return None, url, None



def analyze_dom_structure(html: str, final_url: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")

    parsed_base = urlparse(final_url)
    base_domain = parsed_base.netloc
    global_password_inputs = soup.find_all("input", {"type": "password"})
    has_password_field = len(global_password_inputs) > 0

    forms = soup.find_all("form")
    num_forms = len(forms)

    has_email_field = False
    has_submit_button = False
    external_form_action = False
    hidden_inputs = 0

    for form in forms:
        inputs = form.find_all("input")

        for inp in inputs:
            inp_type = (inp.get("type") or "").lower()

            if inp_type == "email":
                has_email_field = True
            if inp_type == "hidden":
                hidden_inputs += 1

        if form.find("button", {"type": "submit"}) or form.find("input", {"type": "submit"}):
            has_submit_button = True

        action = form.get("action")
        if action:
            action_url = urljoin(final_url, action)
            action_domain = urlparse(action_url).netloc
            if action_domain and action_domain != base_domain:
                external_form_action = True
        else:
            external_form_action = True

    # HIDDEN ELEMENTS
    css_hidden_elements = soup.select(
        '[style*="display:none"], [style*="visibility:hidden"]'
    )

    # IFRAME ANALYSIS
    iframes = soup.find_all("iframe")
    iframe_count = len(iframes)

    invisible_iframes = sum(
        1 for iframe in iframes
        if "display:none" in iframe.get("style", "") or
           "visibility:hidden" in iframe.get("style", "")
    )

    # PAGE COMPLETENESS
    has_footer = bool(soup.find("footer"))

    links = soup.find_all("a", href=True)
    link_texts = " ".join(a.get_text().lower() for a in links)

    return {
        "num_forms": num_forms,
        "has_password_field": has_password_field,
        "has_email_field": has_email_field,
        "has_submit_button": has_submit_button,
        "external_form_action": external_form_action,
        "hidden_inputs": hidden_inputs,
        "css_hidden_elements": len(css_hidden_elements),
        "iframe_count": iframe_count,
        "invisible_iframes": invisible_iframes,
        "missing_footer": not has_footer,
        "has_about_link": "about" in link_texts,
        "has_contact_link": "contact" in link_texts,
        "has_privacy_link": "privacy" in link_texts,
        "has_terms_link": "terms" in link_texts
    }

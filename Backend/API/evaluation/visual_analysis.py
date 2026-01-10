from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin


def analyze_visual_structure(html: str, base_url: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")

    # LAYOUT SIMPLICITY 
    links = soup.find_all("a", href=True)
    num_links = len(links)

    sections = soup.find_all(["section", "div", "article"])
    num_sections = len(sections)

    # NAVIGATION CHECK 

    has_navbar = bool(
        soup.find("nav") or
        soup.find("div", {"class": lambda x: x and "nav" in x.lower()})
    )

    has_logo = bool(
        soup.find("img", {"alt": lambda x: x and "logo" in x.lower()}) or
        soup.find("img", {"class": lambda x: x and "logo" in x.lower()})
    )

    has_brand_text = bool(
        soup.find("h1") or soup.find("h2")
    )

    # 🔴 GLOBAL PASSWORD FIELD (do not rely on <form>)
    has_password_field = bool(
        soup.find("input", {"type": "password"})
    )



    # Check internal navigation
    internal_links = 0
    base_domain = urlparse(base_url).netloc

    for link in links:
        href = link.get("href")
        if not href:
            continue
        full_url = urljoin(base_url, href)
        if urlparse(full_url).netloc == base_domain:
            internal_links += 1

    single_page_login = (
        has_password_field and
        not has_navbar and
        internal_links <= 2 and
        num_links <= 5
    )

    return {
        "num_links": num_links,
        "num_sections": num_sections,
        "has_navbar": has_navbar,
        "has_logo": has_logo,
        "has_brand_text": has_brand_text,
        "single_page_login": single_page_login
    }

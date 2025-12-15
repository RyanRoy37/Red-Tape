import pandas as pd
import numpy as np
from urllib.parse import urlparse, parse_qs
import tldextract
import whois
import dns.resolver
import socket
import ssl
import requests
from datetime import datetime
import math


# ============================================================
# ---------------- BASIC FEATURE FUNCTIONS -------------------
# ============================================================

def Querylength(url): return len(urlparse(url).query)

def domain_token_count(url):
    domain = tldextract.extract(url).domain
    return len(domain.split(".")) if domain else 0

def path_token_count(url):
    return len([p for p in urlparse(url).path.split("/") if p])

def avgdomaintokenlen(url):
    parts = tldextract.extract(url).domain.split(".")
    return np.mean([len(x) for x in parts]) if parts else 0

def longdomaintokenlen(url):
    parts = tldextract.extract(url).domain.split(".")
    return max([len(x) for x in parts]) if parts else 0

def avgpathtokenlen(url):
    tokens = [p for p in urlparse(url).path.split("/") if p]
    return np.mean([len(x) for x in tokens]) if tokens else 0

def tld(url): return tldextract.extract(url).suffix

def charcompvowels(url):
    vowels = "aeiou"
    return sum(c.lower() in vowels for c in url) / max(1, len(url))

def charcompace(url):
    specials = "!@#$%^&*()_-+=[]{};:,<>?/\\|`~"
    return sum(c in specials for c in url) / max(1, len(url))

def ldl_url(url): return sum(c.isalpha() for c in url)
def ldl_domain(url): return sum(c.isalpha() for c in tldextract.extract(url).domain)
def ldl_path(url): return sum(c.isalpha() for c in urlparse(url).path)

def ldl_filename(url):
    return sum(c.isalpha() for c in urlparse(url).path.split("/")[-1])

def ldl_getArg(url): return sum(c.isalpha() for c in urlparse(url).query)

def dld_url(url): return sum(c.isdigit() for c in url)
def dld_domain(url): return sum(c.isdigit() for c in tldextract.extract(url).domain)
def dld_path(url): return sum(c.isdigit() for c in urlparse(url).path)

def dld_filename(url):
    return sum(c.isdigit() for c in urlparse(url).path.split("/")[-1])

def dld_getArg(url): return sum(c.isdigit() for c in urlparse(url).query)

def urlLen(url): return len(url)
def domainlength(url): return len(tldextract.extract(url).domain)
def pathLength(url): return len(urlparse(url).path)
def subDirLen(url): return sum(len(p) for p in urlparse(url).path.split("/")[:-1])
def fileNameLen(url): return len(urlparse(url).path.split("/")[-1])

def this_fileExtLen(url):
    fname = urlparse(url).path.split("/")[-1]
    return len(fname.split(".")[-1]) if "." in fname else 0

def ArgLen(url): return len(urlparse(url).query)

def pathurlRatio(url): return pathLength(url) / max(1, urlLen(url))
def ArgUrlRatio(url): return ArgLen(url) / max(1, urlLen(url))
def argDomanRatio(url): return ArgLen(url) / max(1, domainlength(url))
def domainUrlRatio(url): return domainlength(url) / max(1, urlLen(url))
def pathDomainRatio(url): return pathLength(url) / max(1, domainlength(url))
def argPathRatio(url): return ArgLen(url) / max(1, pathLength(url))

def executable(url): return int(url.endswith((".exe", ".dll", ".bat", ".scr")))
def isPortEighty(url): return int(":80" in url)
def NumberofDotsinURL(url): return url.count(".")

def ISIpAddressInDomainName(url):
    host = urlparse(url).netloc.split(":")[0]
    parts = host.split(".")
    return int(len(parts) == 4 and all(p.isdigit() for p in parts))

def CharacterContinuityRate(url):
    return sum(url[i] == url[i+1] for i in range(len(url)-1)) / max(1, len(url))

def LongestVariableValue(url):
    params = parse_qs(urlparse(url).query)
    return max((len(v[0]) for v in params.values()), default=0)

def URL_sensitiveWord(url):
    words = ["login", "secure", "verify", "account", "update", "password", "bank"]
    return int(any(w in url.lower() for w in words))

def URLQueries_variable(url): return len(parse_qs(urlparse(url).query))
def url_shortened(url): return int(any(s in url for s in ["bit.ly", "tinyurl", "goo.gl"]))
def email_in_url(url): return int("@" in url)


# =========================
# -------- ENTROPY --------
# =========================

def entropy(s):
    if not s:
        return 0
    probs = [s.count(c) / len(s) for c in set(s)]
    return -sum(p * math.log2(p) for p in probs)

def Entropy_URL(url): return entropy(url)
def Entropy_Domain(url): return entropy(urlparse(url).netloc)


# ============================================================
# ---------------- ADVANCED FEATURES (SLOW) ------------------
# ============================================================

def time_domain_activation(url):
    try:
        domain = urlparse(url).netloc.replace("www.", "")
        w = whois.whois(domain)
        d = w.creation_date
        if isinstance(d, list): d = d[0]
        return (datetime.utcnow() - d).days if d else 0
    except:
        return 0

def time_domain_expiration(url):
    try:
        domain = urlparse(url).netloc.replace("www.", "")
        w = whois.whois(domain)
        d = w.expiration_date
        if isinstance(d, list): d = d[0]
        return (d - datetime.utcnow()).days if d else 0
    except:
        return 0

def ttl_hostname(url):
    try:
        domain = urlparse(url).netloc.replace("www.", "")
        return dns.resolver.resolve(domain, 'A').rrset.ttl
    except:
        return 0

def asn_ip(url):
    try:
        ip = socket.gethostbyname(urlparse(url).netloc)
        q = ".".join(reversed(ip.split("."))) + ".origin.asn.cymru.com"
        return int(dns.resolver.resolve(q, "TXT")[0].to_text().split("|")[0])
    except:
        return 0

def qty_ip_resolved(url):
    try:
        return len(dns.resolver.resolve(urlparse(url).netloc, 'A'))
    except:
        return 0

def qty_nameservers(url):
    try:
        return len(dns.resolver.resolve(urlparse(url).netloc, 'NS'))
    except:
        return 0

def qty_mx_servers(url):
    try:
        return len(dns.resolver.resolve(urlparse(url).netloc, 'MX'))
    except:
        return 0

def domain_spf(url):
    try:
        for r in dns.resolver.resolve(urlparse(url).netloc, 'TXT'):
            if "v=spf1" in r.to_text().lower():
                return 1
        return 0
    except:
        return 0

def tls_ssl_certificate(url):
    try:
        host = urlparse(url).netloc
        ctx = ssl.create_default_context()
        with socket.create_connection((host, 443), timeout=5) as sock:
            with ctx.wrap_socket(sock, server_hostname=host):
                return 1
    except:
        return 0

def time_response(url):
    try:
        start = datetime.now()
        requests.get(url, timeout=5)
        return int((datetime.now() - start).total_seconds() * 1000)
    except:
        return 0


# ============================================================
# ---------------- FEATURE GROUPS ----------------------------
# ============================================================

BASIC_FEATURES = [
    Querylength, domain_token_count, path_token_count,
    avgdomaintokenlen, longdomaintokenlen, avgpathtokenlen,
    tld, charcompvowels, charcompace,
    ldl_url, ldl_domain, ldl_path, ldl_filename, ldl_getArg,
    dld_url, dld_domain, dld_path, dld_filename, dld_getArg,
    urlLen, domainlength, pathLength, subDirLen, fileNameLen,
    this_fileExtLen, ArgLen,
    pathurlRatio, ArgUrlRatio, argDomanRatio, domainUrlRatio,
    pathDomainRatio, argPathRatio,
    executable, isPortEighty, NumberofDotsinURL,
    ISIpAddressInDomainName, CharacterContinuityRate,
    LongestVariableValue, URL_sensitiveWord,
    URLQueries_variable, url_shortened, email_in_url,
    Entropy_URL, Entropy_Domain
]

ADVANCED_FEATURES = [
    time_domain_activation, time_domain_expiration,
    ttl_hostname, asn_ip, qty_ip_resolved,
    qty_nameservers, qty_mx_servers,
    domain_spf, tls_ssl_certificate, time_response
]


# ============================================================
# ---------------- CENTRAL EXTRACTORS -------------------------
# ============================================================

def extract_basic_features(url):
    print(f"Extracting basic features for URL: {url}")
    return [f(url) for f in BASIC_FEATURES]

def extract_advanced_features(url):
    return extract_basic_features(url) + [f(url) for f in ADVANCED_FEATURES]


# ============================================================
# ---------------- CSV PIPELINES ------------------------------
# ============================================================

def process_csv_basic(input_csv, output_csv):
    df = pd.read_csv(input_csv)
    rows = [extract_basic_features(u) for u in df['url']]
    out = pd.DataFrame(rows, columns=[f.__name__ for f in BASIC_FEATURES])
    out['URL_Type_obf_Type'] = df['status']
    out.to_csv(output_csv, index=False)
    print(f"[BASIC] Finished! Saved to {output_csv}")

def process_csv_advanced(input_csv, output_csv):
    df = pd.read_csv(input_csv)
    rows = [extract_advanced_features(u) for u in df['url']]
    cols = [f.__name__ for f in BASIC_FEATURES + ADVANCED_FEATURES]
    out = pd.DataFrame(rows, columns=cols)
    out['URL_Type_obf_Type'] = df['status']
    out.to_csv(output_csv, index=False)
    print(f"[BASIC] Finished! Saved to {output_csv}")

process_csv_basic("data/new_data_urls.csv", "data/processed_features.csv")
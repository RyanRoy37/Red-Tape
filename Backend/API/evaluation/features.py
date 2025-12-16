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

def entropy(s):
    if not s:
        return 0
    probs = [s.count(c) / len(s) for c in set(s)]
    return -sum(p * math
    .log2(p) for p in probs)

def Entropy_URL(url): return entropy(url)
def Entropy_Domain(url): return entropy(urlparse(url).netloc)


import pandas as pd
import numpy as np
import torch




def mean_pooling(token_embeddings, attention_mask):
    mask = attention_mask.unsqueeze(-1).float()
    return (token_embeddings * mask).sum(1) / mask.sum(1)
# assumes these are already loaded globally
# tokenizer, model, DEVICE
# BASIC_FEATURES, evaluate_basic_features (from earlier)

 # shape: (hidden_dim,)


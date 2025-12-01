import re
import math
from urllib.parse import urlparse, parse_qs
from collections import Counter
from math import log2

def entropy(s):
    """Calculate Shannon entropy of a string"""
    if not s:
        return 0
    prob = [freq / len(s) for freq in Counter(s).values()]
    return -sum(p * math.log2(p) for p in prob)

def extract_url_features(url):
    parsed = urlparse(url)

    domain = parsed.netloc
    path = parsed.path
    query = parsed.query

    # ---------- BASIC TOKENIZATION ----------
    domain_tokens = re.split(r'\.|-', domain) if domain else []
    path_tokens = [p for p in path.split('/') if p]
    query_tokens = list(parse_qs(query).keys())

    filename = path_tokens[-1] if path_tokens else ""
    file_ext = filename.split('.')[-1] if "." in filename else ""
    
    # ---------- CHARACTER COUNTS ----------
    def vowel_count(s): return sum(c.lower() in 'aeiou' for c in s)
    def alpha_count(s): return sum(c.isalpha() for c in s)
    def digit_count(s): return sum(c.isdigit() for c in s)
    def symbol_count(s): return sum(not c.isalnum() for c in s)
    
    # ---------- LENGTH HELPERS ----------
    def safe_len(x): return len(x) if x else 0
    
    # ---------- FEATURE CALCULATIONS ----------

    features = {
        # Lexical
        'Querylength': safe_len(query),
        'domain_token_count': len(domain_tokens),
        'path_token_count': len(path_tokens),
        'avgdomaintokenlen': (sum(len(t) for t in domain_tokens) / len(domain_tokens)) if domain_tokens else 0,
        'longdomaintokenlen': max((len(t) for t in domain_tokens), default=0),
        'avgpathtokenlen': (sum(len(t) for t in path_tokens) / len(path_tokens)) if path_tokens else 0,
        'tld': domain.split('.')[-1] if '.' in domain else '',
        
        'charcompvowels': vowel_count(url),
        'charcompace': alpha_count(url),
        
        # Length distance-based ratio
        'ldl_url': len(url),
        'ldl_domain': len(domain),
        'ldl_path': len(path),
        'ldl_filename': len(filename),
        'ldl_getArg': len(query),
        
        'dld_url': len(url),
        'dld_domain': len(domain),
        'dld_path': len(path),
        'dld_filename': len(filename),
        'dld_getArg': len(query),

        'urlLen': len(url),
        'domainlength': len(domain),
        'pathLength': len(path),
        'subDirLen': sum(len(t) for t in path_tokens[:-1]) if len(path_tokens) > 1 else 0,
        'fileNameLen': len(filename),
        'this.fileExtLen': len(file_ext),
        'ArgLen': len(query),
        
        # Ratios
        'pathurlRatio': len(path) / len(url) if len(url) else 0,
        'ArgUrlRatio': len(query) / len(url) if len(url) else 0,
        'argDomanRatio': len(query) / len(domain) if len(domain) else 0,
        'domainUrlRatio': len(domain) / len(url) if len(url) else 0,
        'pathDomainRatio': len(path) / len(domain) if len(domain) else 0,
        'argPathRatio': len(query) / len(path) if len(path) else 0,
        
        # Flags
        'executable': file_ext.lower() in ['exe', 'bin', 'msi', 'sh'],
        'isPortEighty': parsed.port == 80 or parsed.port is None,
        'NumberofDotsinURL': url.count('.'),
        'ISIpAddressInDomainName': bool(re.match(r"^\d{1,3}(\.\d{1,3}){3}$", domain)),
        
        'CharacterContinuityRate': max([len(m.group(0)) for m in re.finditer(r'(.)\1+', url)] or [0]),
        
        'LongestVariableValue': max((len(v[0]) for v in parse_qs(query).values()), default=0),
        
        # Digit Counts
        'URL_DigitCount': digit_count(url),
        'host_DigitCount': digit_count(domain),
        'Directory_DigitCount': sum(digit_count(t) for t in path_tokens),
        'File_name_DigitCount': digit_count(filename),
        'Extension_DigitCount': digit_count(file_ext),
        'Query_DigitCount': digit_count(query),
        
        # Letter Counts
        'URL_Letter_Count': alpha_count(url),
        'host_letter_count': alpha_count(domain),
        'Directory_LetterCount': sum(alpha_count(t) for t in path_tokens),
        'Filename_LetterCount': alpha_count(filename),
        'Extension_LetterCount': alpha_count(file_ext),
        'Query_LetterCount': alpha_count(query),
        
        # Longest Tokens
        'LongestPathTokenLength': max((len(t) for t in path_tokens), default=0),
        'Domain_LongestWordLength': max((len(t) for t in domain_tokens), default=0),
        'Path_LongestWordLength': max((len(t) for t in path_tokens), default=0),
        'sub-Directory_LongestWordLength': max((len(t) for t in path_tokens[:-1]), default=0),
        'Arguments_LongestWordLength': max((len(k) for k in query_tokens), default=0),
        
        # Sensitive words
        'URL_sensitiveWord': int(any(bad in url.lower() for bad in 
                                     ['login', 'secure', 'verify', 'update', 'account', 'bank'])),
        
        # Query variable count
        'URLQueries_variable': len(query_tokens),
        
        # Special Characters
        'spcharUrl': symbol_count(url),
        'delimeter_Domain': domain.count('/'),
        'delimeter_path': path.count('/'),
        'delimeter_Count': url.count('/'),
        
        # Number Ratios
        'NumberRate_URL': digit_count(url)/len(url) if len(url) else 0,
        'NumberRate_Domain': digit_count(domain)/len(domain) if len(domain) else 0,
        'NumberRate_DirectoryName': digit_count(path)/len(path) if len(path) else 0,
        'NumberRate_FileName': digit_count(filename)/len(filename) if len(filename) else 0,
        'NumberRate_Extension': digit_count(file_ext)/len(file_ext) if len(file_ext) else 0,
        'NumberRate_AfterPath': digit_count(query)/len(query) if len(query) else 0,
        
        # Symbol Ratios
        'SymbolCount_URL': symbol_count(url),
        'SymbolCount_Domain': symbol_count(domain),
        'SymbolCount_Directoryname': sum(symbol_count(t) for t in path_tokens),
        'SymbolCount_FileName': symbol_count(filename),
        'SymbolCount_Extension': symbol_count(file_ext),
        'SymbolCount_Afterpath': symbol_count(query),
        
        # Entropy
        'Entropy_URL': entropy(url),
        'Entropy_Domain': entropy(domain),
        'Entropy_DirectoryName': entropy(path),
        'Entropy_Filename': entropy(filename),
        'Entropy_Extension': entropy(file_ext),
        'Entropy_Afterpath': entropy(query),
        
    
    }

    return features

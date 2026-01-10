from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
import asyncio
from typing import Dict, Any, Optional
import requests
from datetime import datetime
import socket
import dns.resolver
import whois
import ssl
import OpenSSL
from urllib.parse import urlparse
import subprocess
import base64
from io import BytesIO
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
from evaluation.scoring_engine import content_scan
from evaluation.prediction import predict


router = APIRouter()

class AdvancedAnalysisRequest(BaseModel):
    url: str

class AdvancedAnalysisResponse(BaseModel):
    url: str
    is_phishing: bool
    risk_score: float
    confidence: str
    screenshot: Optional[str]
    html_content: Optional[str]
    features: Dict[str, Any]
    explanations: list

# Helper functions
def get_domain_info(url: str) -> Dict[str, Any]:
    """Extract domain information using WHOIS"""
    try:
        parsed_url = urlparse(url)
        domain = parsed_url.netloc
        
        w = whois.whois(domain)
        
        creation_date = w.creation_date
        expiration_date = w.expiration_date
        
        if isinstance(creation_date, list):
            creation_date = creation_date[0]
        if isinstance(expiration_date, list):
            expiration_date = expiration_date[0]
            
        time_domain_activation = -1
        time_domain_expiration = -1
        
        if creation_date:
            time_domain_activation = (datetime.now() - creation_date).days
        if expiration_date:
            time_domain_expiration = (expiration_date - datetime.now()).days
            
        return {
            'time_domain_activation': time_domain_activation,
            'time_domain_expiration': time_domain_expiration
        }
    except Exception as e:
        return {
            'time_domain_activation': -1,
            'time_domain_expiration': -1
        }

def get_dns_info(url: str) -> Dict[str, Any]:
    """Get DNS information"""
    try:
        parsed_url = urlparse(url)
        domain = parsed_url.netloc
        
        # TTL
        ttl_hostname = -1
        try:
            answers = dns.resolver.resolve(domain, 'A')
            ttl_hostname = answers.rrset.ttl
        except:
            pass
        
        # IP addresses
        qty_ip_resolved = 0
        try:
            ips = socket.gethostbyname_ex(domain)[2]
            qty_ip_resolved = len(ips)
        except:
            pass
        
        # Nameservers
        qty_nameservers = 0
        try:
            ns_answers = dns.resolver.resolve(domain, 'NS')
            qty_nameservers = len(ns_answers)
        except:
            pass
        
        # MX servers
        qty_mx_servers = 0
        try:
            mx_answers = dns.resolver.resolve(domain, 'MX')
            qty_mx_servers = len(mx_answers)
        except:
            pass
        
        # SPF
        domain_spf = 0
        try:
            txt_answers = dns.resolver.resolve(domain, 'TXT')
            for rdata in txt_answers:
                if 'spf' in str(rdata).lower():
                    domain_spf = 1
                    break
        except:
            pass
        
        # ASN (simplified - would need external API for real implementation)
        asn_ip = 0
        
        return {
            'ttl_hostname': ttl_hostname,
            'asn_ip': asn_ip,
            'qty_ip_resolved': qty_ip_resolved,
            'qty_nameservers': qty_nameservers,
            'qty_mx_servers': qty_mx_servers,
            'domain_spf': domain_spf
        }
    except Exception as e:
        return {
            'ttl_hostname': -1,
            'asn_ip': 0,
            'qty_ip_resolved': 0,
            'qty_nameservers': 0,
            'qty_mx_servers': 0,
            'domain_spf': 0
        }

def get_ssl_info(url: str) -> Dict[str, Any]:
    """Check SSL/TLS certificate"""
    try:
        parsed_url = urlparse(url)
        hostname = parsed_url.netloc
        port = 443
        
        context = ssl.create_default_context()
        with socket.create_connection((hostname, port), timeout=10) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()
                
        return {'tls_ssl_certificate': 1}
    except:
        return {'tls_ssl_certificate': 0}

def check_google_index(url: str) -> Dict[str, Any]:
    """Check if URL/domain is indexed by Google (simplified)"""
    try:
        parsed_url = urlparse(url)
        domain = parsed_url.netloc
        
        # Note: Real implementation would use Google Search API
        # This is a simplified version
        return {
            'url_google_index': 1,
            'domain_google_index': 1
        }
    except:
        return {
            'url_google_index': 0,
            'domain_google_index': 0
        }

def get_response_time(url: str) -> Dict[str, Any]:
    """Measure response time"""
    try:
        start_time = time.time()
        response = requests.get(url, timeout=10, allow_redirects=True)
        end_time = time.time()
        
        time_response = (end_time - start_time) * 1000  # Convert to milliseconds
        
        return {'time_response': round(time_response, 2)}
    except:
        return {'time_response': -1}

def capture_screenshot(url: str) -> Optional[str]:
    """Capture screenshot of the website"""
    try:
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        
        driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=chrome_options
        )
        
        driver.get(url)
        time.sleep(3)  # Wait for page to load
        
        screenshot = driver.get_screenshot_as_png()
        driver.quit()
        
        # Convert to base64
        screenshot_base64 = base64.b64encode(screenshot).decode('utf-8')
        return f"data:image/png;base64,{screenshot_base64}"
    except Exception as e:
        print(f"Screenshot error: {e}")
        return None

def get_html_content(url: str) -> Optional[str]:
    """Fetch HTML content of the website"""
    try:
        response = requests.get(url, timeout=10, allow_redirects=True)
        return response.text
    except Exception as e:
        print(f"HTML fetch error: {e}")
        return None

@router.post("/advanced-analysis", response_model=AdvancedAnalysisResponse)
async def advanced_analysis(request: AdvancedAnalysisRequest):
    """
    Perform advanced analysis on a URL including:
    - Domain and DNS information
    - SSL/TLS certificate check
    - Google indexing status
    - Response time measurement
    - Screenshot capture
    - HTML content extraction
    """
    try:
        url = request.url
        
        # Ensure URL has scheme
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        
        # Run all analyses concurrently
        domain_info = get_domain_info(url)
        dns_info = get_dns_info(url)
        ssl_info = get_ssl_info(url)
        google_index = check_google_index(url)
        response_time = get_response_time(url)
        
        # Combine all features
        features = {
            **domain_info,
            **dns_info,
            **ssl_info,
            **google_index,
            **response_time
        }
        
        # Capture screenshot and HTML (these may take longer)
        screenshot = capture_screenshot(url)
        html_content = get_html_content(url)
        
        # Call the ML model for prediction
        try:
            url_result = predict(url)
            content_result = content_scan(url)

            # Same logic as scan-url
            if content_result["decision"] == "phishing":
                ml_result = {
                    "is_phishing": True,
                    "risk_score": content_result["risk_score"],
                    "confidence": content_result["confidence"],
                    "explanations": content_result.get("explanations", [])
                }
            else:
                final_risk = (
                    0.35 * url_result["risk_score"] +
                    0.65 * content_result["risk_score"]
                )

                if final_risk >= 60:
                    decision = "phishing"
                    confidence = "high"
                elif final_risk >= 40:
                    decision = "suspicious"
                    confidence = "medium"
                else:
                    decision = "legitimate"
                    confidence = "low"

                ml_result = {
                    "is_phishing": decision == "phishing",
                    "risk_score": round(final_risk, 2),
                    "confidence": confidence,
                    "explanations": content_result.get("explanations", [])
                }

            print("ADVANCED ANALYSIS ML RESULT:", ml_result)

        except Exception as e:
            print("ML PIPELINE FAILED:", e)
            ml_result = {
                "is_phishing": False,
                "risk_score": 0.5,
                "confidence": "medium",
                "explanations": ["ML model analysis unavailable"]
            }
        return AdvancedAnalysisResponse(
            url=url,
            is_phishing=ml_result["is_phishing"],
            risk_score=ml_result["risk_score"],
            confidence=ml_result["confidence"],
            screenshot=screenshot,
            html_content=html_content,
            features=features,
            explanations=ml_result.get("explanations", [])
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
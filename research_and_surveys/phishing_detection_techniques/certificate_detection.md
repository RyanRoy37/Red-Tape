<h1 align="center">Phishing Prevention Focusing on Certificates and Input Forms: PoC as Browser Extensions</h1>

<a href="https://ieeexplore.ieee.org/document/11012853">Research Paper</a>

<h2> Abstract </h2>
<h3>Phishing attacks against consumers have become increasingly sophisticated, necessitating effective real-time detection methods. This study analyzes the characteristics of phishing sites, focusing on certificate validity periods and input forms. Based on a dataset of 1,047 unique fake website URLs collected from multiple sources, we found that 89.8% of the phishing sites had certificate validity periods of 90 days or less. To effectively prevent this threat, we developed a proof-of-concept (PoC) browser extension that leverages certificates and input forms as key indicators for real-time phishing detection. The PoC extension achieved an detection rate of 93.9%. Comparative analysis showed that our approach outperformed several existing solutions, including Google Safe Browsing, in detecting phishing sites. While the proposed method demonstrates high effectiveness, we also discuss its limitations. This study demonstrates the potential of approaches leveraging certificates and input forms for real-time detection, offering a simple yet effective countermeasure.</h3>

<h3> AI Generated Implementation</h3>

# Implementation Steps for Real-Time Phishing Site Detection (Certificate + Input Form Based)

## 1. Data Collection
- **Phishing feed:** Collect phishing site URLs from multiple trusted sources (e.g., OpenPhish, FakeShopping, researcher-identified datasets).  
- **Legitimate feed:** Collect legitimate site URLs from verified banks, credit-card providers, major crypto services, and well-known e-commerce platforms.  
- Maintain provenance metadata for each URL (source, collection date, any pre-processing).

## 2. Certificate Extraction & Analysis
- For each URL, extract SSL/TLS certificate details:
  - Issuer (CA)
  - Subject / Organization name
  - Validity period (notBefore, notAfter)
  - Expiration date
  - Key usage / extensions (if needed)
- Compute certificate duration = `notAfter - notBefore`.
- Classify certificate duration into buckets:
  - `≤ 90 days` (short-lived)
  - `> 90 days` (long-lived)
- Log certificate anomalies (self-signed, mismatched CN/SAN, weak signature algorithms).

## 3. Hosting & Infrastructure Signals
- Identify hosting platform characteristics:
  - Reverse DNS, ASN, IP geolocation
  - Cloud provider fingerprints (AWS, Azure, GCP, DigitalOcean, etc.)
  - Shared hosting indicators and use of free hosting / dynamic IPs
- Flag hosting providers commonly abused by attackers.

## 4. Webpage Structure & Input Form Detection
- Inspect webpage HTML to detect presence and details of input forms:
  - Form types: login, payment, registration
  - Input fields: `type="password"`, `type="email"`, `name="cc"`, `input` masked fields
  - Form action (POST to external domain vs same-origin)
  - Inline JavaScript handling form submission (obfuscated redirects, data exfiltration)
- Heuristics to identify suspicious form behavior (external form actions, invisible fields, auto-posting).

## 5. Browser Extension (Manifest V3) Design
- Build a Chrome extension using Manifest V3 with following components:
  - **manifest.json** (permissions: `activeTab`, `scripting`, `storage`, `webRequest` if needed for metadata)
  - **Content script** to inspect DOM and detect form activation and details
  - **Background service worker** to orchestrate checks and manage state
  - **Popup/notification UI** to show warnings and allow user actions (Proceed / Go back / Report)
  - **Options page** for whitelist/blacklist and telemetry consent
- Secure extension code: minimize permissions, CSP, sanitize messages.

## 6. CertCheck API Integration
- Implement a **CertCheck API** (or integrate an existing certificate-info API) to return real-time certificate details for a given hostname/URL.
- Background worker calls CertCheck for the active tab when:
  - Page load completes, or
  - A form activation event is detected
- Cache recent results with TTL to reduce latency and API rate usage.

## 7. Real-Time Monitoring & Detection Workflow
1. **Monitor active tab** in background worker.  
2. On page load or when an input form is activated:
   - Run content script to detect form presence and extract form metadata.
   - Query CertCheck for certificate duration and validity.
   - Query hosting signals (optional asynchronous lookup).
3. **Detection rule (core heuristic):**
   - If **certificate duration ≤ 90 days** **AND** **input form detected** → flag as **potential phishing**.
   - Add additional weighted signals (short-lived certificate, suspicious hosting, external POST target, mismatched domain in cert) to produce a confidence score.
4. **User-facing action:** If flagged above threshold → show warning popup **before data e**

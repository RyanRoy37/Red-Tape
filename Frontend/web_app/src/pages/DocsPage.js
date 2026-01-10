import React, { useState } from 'react';
import VintageTexture from '../components/common/VintageTexture';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';

const DocsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeSection, setActiveSection] = useState('introduction');

  const API_BASE_URL = 'https://api.redtape-security.com';

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const CodeBlock = ({ code, language = 'json', id }) => (
    <div className="relative border-2 border-black bg-gray-900 text-green-400 font-mono text-sm overflow-x-auto">
      <div className="flex justify-between items-center px-4 py-2 border-b-2 border-black bg-black text-white">
        <span className="text-xs font-bold uppercase">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center gap-2 text-xs hover:text-red-500 transition-colors"
        >
          {copiedId === id ? (
            <>
              <Check size={14} /> COPIED
            </>
          ) : (
            <>
              <Copy size={14} /> COPY
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  const sections = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'authentication', label: 'Authentication' },
    { id: 'health-check', label: 'Health Check' },
    { id: 'scan-url', label: 'Scan URL' },
    { id: 'advanced-analysis', label: 'Advanced Analysis' },
    { id: 'ai-explain', label: 'AI Explanation' },
    { id: 'rate-limits', label: 'Rate Limits' },
    { id: 'errors', label: 'Error Handling' },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-mono relative overflow-hidden">
      <VintageTexture />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wider relative inline-block">
              API DOCUMENTATION
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-500"></span>
            </h1>
            <p className="text-lg mt-6 opacity-70 tracking-wide">
              RED TAPE PHISHING DETECTION API v1.0
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="border-4 border-black bg-white p-4 sticky top-24 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold text-lg mb-4 pb-2 border-b-2 border-black">
                  CONTENTS
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection(section.id);
                        document
                          .getElementById(section.id)
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`block px-3 py-2 text-sm border-l-4 transition-colors ${
                        activeSection === section.id
                          ? 'border-red-500 bg-red-50 font-bold'
                          : 'border-black hover:border-red-500 hover:bg-gray-50'
                      }`}
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
                              {/* Introduction */}
              <section
                id="introduction"
                className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <h2 className="text-3xl font-bold mb-4 border-b-2 border-black pb-2">
                  INTRODUCTION
                </h2>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p>
                    Welcome to the Red Tape Phishing Detection API. This API
                    provides advanced machine learning-based phishing detection
                    capabilities including URL analysis, content inspection,
                    and AI-powered explanations.
                  </p>
                  <div className="border-2 border-black bg-yellow-50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={20} className="mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-bold mb-1">BASE URL</p>
                        <code className="bg-black text-green-400 px-2 py-1 text-xs">
                          {API_BASE_URL}
                        </code>
                      </div>
                    </div>
                  </div>
                  <p>
                    All API requests should be made to this base URL. The API
                    returns JSON responses and uses standard HTTP response codes
                    to indicate success or failure.
                  </p>
                </div>
              </section>

              {/* Authentication */}
              <section
                id="authentication"
                className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <h2 className="text-3xl font-bold mb-4 border-b-2 border-black pb-2">
                  AUTHENTICATION
                </h2>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p>
                    Currently, the API is open and does not require
                    authentication. However, rate limits apply to prevent
                    abuse. Future versions may require API keys for production
                    use.
                  </p>
                  <CodeBlock
                    id="auth-headers"
                    language="http"
                    code={`Content-Type: application/json
User-Agent: YourApp/1.0`}
                  />
                </div>
              </section>

              {/* Health Check */}
              <section
                id="health-check"
                className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <h2 className="text-3xl font-bold mb-4 border-b-2 border-black pb-2">
                  HEALTH CHECK
                </h2>
                <CodeBlock
                  id="health-request"
                  language="bash"
                  code={`curl -X GET ${API_BASE_URL}/`}
                />
                <CodeBlock
                  id="health-response"
                  language="json"
                  code={`{
  "message": "Phishing Detection API"
}`}
                />
              </section>

              {/* Scan URL */}
              <section
                id="scan-url"
                className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <h2 className="text-3xl font-bold mb-4 border-b-2 border-black pb-2">
                  SCAN URL
                </h2>

                <CodeBlock
                  id="scan-request"
                  language="json"
                  code={`{
  "url": "https://example.com/login"
}`}
                />

                <CodeBlock
                  id="scan-response"
                  language="json"
                  code={`{
  "url": "https://suspicious-paypal-login.com",
  "is_phishing": true,
  "risk_score": 0.875,
  "confidence": "high",
  "explanations": [
    "Suspicious domain name mimicking legitimate brand",
    "Recently registered domain (< 30 days)",
    "Missing SPF record",
    "Unusual TLD for financial service"
  ]
}`}
                />
              </section>

              {/* Advanced Analysis */}
              <section
                id="advanced-analysis"
                className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <h2 className="text-3xl font-bold mb-4 border-b-2 border-black pb-2">
                  ADVANCED ANALYSIS
                </h2>

                <CodeBlock
                  id="advanced-response"
                  language="json"
                  code={`{
  "url": "https://suspicious-site.com",
  "is_phishing": true,
  "risk_score": 0.92,
  "confidence": "high",
  "features": {
    "time_domain_activation": 15,
    "time_domain_expiration": 45,
    "ttl_hostname": 300,
    "asn_ip": 0,
    "qty_ip_resolved": 2,
    "qty_nameservers": 2,
    "qty_mx_servers": 0,
    "domain_spf": 0,
    "tls_ssl_certificate": 0,
    "url_google_index": 0,
    "domain_google_index": 0,
    "time_response": 1250.5
  }
}`}
                />
              </section>

              {/* AI Explain */}
              <section
                id="ai-explain"
                className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <h2 className="text-3xl font-bold mb-4 border-b-2 border-black pb-2">
                  AI EXPLANATION
                </h2>

                <CodeBlock
                  id="ai-response"
                  language="json"
                  code={`{
  "explanation": "The analysis reveals this URL is highly likely to be a phishing attempt with 92% confidence."
}`}
                />
              </section>

              {/* Rate Limits */}
              <section
                id="rate-limits"
                className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <h2 className="text-3xl font-bold mb-4 border-b-2 border-black pb-2">
                  RATE LIMITS
                </h2>
                <p className="text-sm">
                  If exceeded, API returns <strong>429 Too Many Requests</strong>.
                </p>
              </section>

              {/* Error Handling */}
              <section
                id="errors"
                className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <h2 className="text-3xl font-bold mb-4 border-b-2 border-black pb-2">
                  ERROR HANDLING
                </h2>

                <CodeBlock
                  id="error-400"
                  language="json"
                  code={`{
  "detail": "URL parameter is required"
}`}
                />

                <CodeBlock
                  id="error-429"
                  language="json"
                  code={`{
  "detail": "Rate limit exceeded. Please try again later."
}`}
                />

                <CodeBlock
                  id="error-500"
                  language="json"
                  code={`{
  "detail": "An unexpected error occurred during analysis"
}`}
                />
              </section>

              {/* SDK Examples */}
              <section className="border-4 border-black bg-gray-50 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-bold mb-4 border-b-2 border-black pb-2">
                  SDK EXAMPLES
                </h2>

                <CodeBlock
                  id="python-sdk"
                  language="python"
                  code={`import requests

response = requests.post(
  "${API_BASE_URL}/endpoints/scan-url",
  json={"url": "https://example.com"}
)

print(response.json())`}
                />

                <CodeBlock
                  id="js-sdk"
                  language="javascript"
                  code={`fetch("${API_BASE_URL}/endpoints/scan-url", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "https://example.com" })
})
.then(res => res.json())
.then(console.log);`}
                />
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;


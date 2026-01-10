import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Link2, 
  Shield, 
  Eye, 
  FileText, 
  Activity, 
  Zap,
  Globe,
  Server,
  Lock,
  Database,
  Camera,
  Chrome
} from 'lucide-react';
import VintageTexture from '../components/common/VintageTexture';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/common/Button';

const FeaturesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      id: 'url-analysis',
      icon: <Link2 size={48} />,
      title: 'URL STRUCTURE ANALYSIS',
      subtitle: 'Deep Pattern Recognition',
      description: 'Analyzes 18+ URL features including length patterns, token counts, character entropy, suspicious TLDs, and sensitive keywords to detect obfuscation and impersonation attempts.',
      details: [
        'URL length and domain structure analysis',
        'Path and query parameter inspection',
        'Homograph attack detection',
        'IP address in domain detection',
        'Suspicious TLD identification',
        'Entropy-based randomness detection'
      ]
    },
    {
      id: 'text-embeddings',
      icon: <Database size={48} />,
      title: 'TEXT EMBEDDINGS',
      subtitle: 'BERT-Tiny Transformer',
      description: 'Lightweight BERT-based transformer model generates contextual embeddings to capture semantic patterns and linguistic characteristics unique to phishing URLs.',
      details: [
        'Contextual URL understanding',
        'Semantic pattern recognition',
        'Fast CPU-optimized inference',
        'Dense vector representations',
        'Transfer learning from millions of URLs'
      ]
    },
    {
      id: 'ml-model',
      icon: <Zap size={48} />,
      title: 'LIGHTGBM CLASSIFIER',
      subtitle: 'Gradient Boosting Engine',
      description: 'High-performance gradient boosting model optimized for hybrid feature processing, combining URL features and text embeddings for accurate phishing detection.',
      details: [
        'Ensemble learning architecture',
        'Hybrid feature fusion',
        'Real-time prediction',
        'High accuracy classification',
        'Confidence scoring'
      ]
    },
    {
      id: 'domain-intelligence',
      icon: <Globe size={48} />,
      title: 'DOMAIN INTELLIGENCE',
      subtitle: 'WHOIS & Registration Data',
      description: 'Examines domain registration data including activation time, expiration dates, and registration patterns to identify newly created or suspicious domains.',
      details: [
        'Domain age verification',
        'Expiration date analysis',
        'Registration pattern detection',
        'WHOIS data extraction',
        'Temporal risk assessment'
      ]
    },
    {
      id: 'dns-analysis',
      icon: <Server size={48} />,
      title: 'DNS & NETWORK ANALYSIS',
      subtitle: 'Infrastructure Inspection',
      description: 'Comprehensive DNS analysis including TTL values, IP resolution patterns, nameserver counts, MX records, and SPF validation to detect malicious hosting infrastructure.',
      details: [
        'DNS TTL anomaly detection',
        'Multiple IP resolution tracking',
        'Nameserver configuration analysis',
        'Mail server inspection',
        'SPF record validation',
        'ASN reputation checking'
      ]
    },
    {
      id: 'ssl-analysis',
      icon: <Lock size={48} />,
      title: 'SSL/TLS CERTIFICATE',
      subtitle: 'Security Protocol Validation',
      description: 'Validates SSL/TLS certificates to identify self-signed, expired, or suspicious certificates commonly used in phishing attacks.',
      details: [
        'Certificate validity check',
        'Self-signed certificate detection',
        'Domain mismatch identification',
        'Certificate authority verification',
        'Encryption protocol analysis'
      ]
    },
    {
      id: 'content-analysis',
      icon: <FileText size={48} />,
      title: 'CONTENT ANALYSIS',
      subtitle: 'HTML & DOM Inspection',
      description: 'Deep inspection of HTML structure, DOM elements, forms, iframes, and JavaScript to detect hidden elements, form manipulation, and malicious scripts.',
      details: [
        'HTML structure analysis',
        'DOM tree inspection',
        'Form field detection',
        'Hidden element identification',
        'JavaScript behavior analysis',
        'Social engineering keyword detection'
      ]
    },
    {
      id: 'visual-analysis',
      icon: <Eye size={48} />,
      title: 'VISUAL ANALYSIS',
      subtitle: 'Screenshot & Brand Detection',
      description: 'Computer vision-based analysis of webpage screenshots to detect brand impersonation, logo similarity, and visual layout mimicry.',
      details: [
        'Automated screenshot capture',
        'Brand logo detection',
        'Visual similarity comparison',
        'Layout analysis',
        'Color scheme matching',
        'Favicon inspection'
      ]
    },
    {
      id: 'indexing-check',
      icon: <Activity size={48} />,
      title: 'SEARCH INDEX STATUS',
      subtitle: 'Google Indexing Verification',
      description: 'Checks if the URL and domain are indexed by Google search engine, as malicious sites are often not indexed or recently removed.',
      details: [
        'URL indexing status',
        'Domain index verification',
        'Search visibility check',
        'Delisting detection',
        'Reputation scoring'
      ]
    },
    {
      id: 'performance',
      icon: <Activity size={48} />,
      title: 'RESPONSE TIME ANALYSIS',
      subtitle: 'Server Performance Metrics',
      description: 'Measures server response time and network latency patterns, as malicious servers often exhibit unusual response characteristics.',
      details: [
        'Server response time measurement',
        'Network latency tracking',
        'Timeout detection',
        'Connection pattern analysis',
        'Performance anomaly detection'
      ]
    },
    {
      id: 'browser-plugin',
      icon: <Chrome size={48} />,
      title: 'BROWSER PLUGIN',
      subtitle: 'Real-Time Protection',
      description: 'Installable Chrome extension providing real-time URL scanning, instant warnings, and seamless protection while browsing.',
      details: [
        'Real-time URL analysis',
        'Instant threat warnings',
        'Zero-click protection',
        'Background monitoring',
        'Privacy-focused design',
        'Lightweight performance'
      ]
    },
    {
      id: 'screenshot-capture',
      icon: <Camera size={48} />,
      title: 'AUTOMATED SCREENSHOT',
      subtitle: 'Selenium-Based Capture',
      description: 'Automated headless browser screenshot capture for visual inspection and archival of suspicious websites.',
      details: [
        'Headless Chrome automation',
        'Full-page screenshot capture',
        'Element visibility detection',
        'Dynamic content rendering',
        'Image processing and storage'
      ]
    }
  ];

  const FeatureModal = ({ feature, onClose }) => {
    if (!feature) return null;

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white border-4 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[12px_12px_0px_0px_rgba(220,38,38,1)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b-4 border-black p-6 bg-red-500 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm font-bold opacity-90 uppercase tracking-wider">
                  {feature.subtitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-3xl font-bold hover:rotate-90 transition-transform duration-300"
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <div className="w-20 h-20 border-4 border-black bg-black flex items-center justify-center mb-4">
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                {feature.description}
              </p>
            </div>

            {/* Details List */}
            <div className="border-2 border-black p-4 bg-gray-50">
              <h4 className="font-bold mb-3 text-lg">KEY CAPABILITIES:</h4>
              <ul className="space-y-2">
                {feature.details.map((detail, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="mr-2 text-red-500 font-bold">▸</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-4 border-black p-6 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-black text-white font-bold hover:bg-red-600 transition-colors border-2 border-black"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono relative overflow-hidden">
      <VintageTexture />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-wider relative inline-block">
            DETECTION FEATURES
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-500"></span>
          </h2>
          <p className="text-lg mt-6 opacity-70 tracking-wide">
            COMPREHENSIVE MULTI-LAYER PHISHING DETECTION SYSTEM
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              onClick={() => setSelectedFeature(feature)}
              className="cursor-pointer border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-20 h-20 border-4 border-black bg-red-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold mb-2 tracking-wide group-hover:text-red-500 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm font-bold mb-3 opacity-60 uppercase tracking-wider">
                  {feature.subtitle}
                </p>
                <p className="text-sm leading-relaxed opacity-80">
                  {feature.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="mt-4 flex justify-end">
                <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* System Overview */}
        <div className="max-w-4xl mx-auto mt-16 border-4 border-black bg-gray-50 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-bold mb-6 text-center">SYSTEM ARCHITECTURE</h3>
          
          <div className="space-y-4 text-sm">
            <div className="border-2 border-black p-4 bg-white">
              <h4 className="font-bold mb-2">📊 HYBRID FEATURE EXTRACTION</h4>
              <p>Combines 18+ handcrafted URL features with BERT-based text embeddings for comprehensive pattern recognition.</p>
            </div>
            
            <div className="border-2 border-black p-4 bg-white">
              <h4 className="font-bold mb-2">🤖 MACHINE LEARNING ENGINE</h4>
              <p>LightGBM gradient boosting classifier trained on millions of URLs with continuous model improvement.</p>
            </div>
            
            <div className="border-2 border-black p-4 bg-white">
              <h4 className="font-bold mb-2">🔍 MULTI-LAYER VERIFICATION</h4>
              <p>DNS analysis, SSL validation, content inspection, and visual similarity detection work together for maximum accuracy.</p>
            </div>
            
            <div className="border-2 border-black p-4 bg-white">
              <h4 className="font-bold mb-2">⚡ REAL-TIME PROTECTION</h4>
              <p>Browser plugin provides instant analysis and warnings with minimal performance impact.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link to="/advanced-analysis">
            <Button variant="secondary" size="large">
              TRY ADVANCED ANALYSIS
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Modal */}
      {selectedFeature && (
        <FeatureModal 
          feature={selectedFeature} 
          onClose={() => setSelectedFeature(null)} 
        />
      )}
    </div>
  );
};

export default FeaturesPage;
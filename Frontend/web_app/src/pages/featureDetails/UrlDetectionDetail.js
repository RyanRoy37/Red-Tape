// src/pages/featureDetails/UrlDetectionDetail.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Link2, CheckCircle } from 'lucide-react';
import VintageTexture from '../../components/common/VintageTexture';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const UrlDetectionDetail = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const capabilities = [
    'Homograph Attacks', 'Typosquatting', 'Subdomain Manipulation',
    'Suspicious TLDs', 'URL Obfuscation', 'Character Substitution',
    'Brand Impersonation', 'Redirect Chain Detection', 'IP-based URLs',
    'Abnormal URL Length', 'Special Character Abuse', 'Keyword Stuffing'
  ];

  const technicalSpecs = [
    { label: 'Model Architecture', value: 'Deep Neural Network + BERT' },
    { label: 'Training Dataset', value: '5M+ URLs' },
    { label: 'Accuracy', value: '96.8%', highlight: true },
    { label: 'False Positive Rate', value: '0.9%' },
    { label: 'Processing Time', value: '<100ms' },
    { label: 'Model Updates', value: 'Weekly' }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-mono relative overflow-hidden">
      <VintageTexture />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <Link 
          to="/features"
          className="inline-flex items-center space-x-2 mb-8 hover:text-red-500 transition-colors duration-300 group"
        >
          <ArrowLeft className="group-hover:-translate-x-2 transition-transform duration-300" size={20} />
          <span className="font-bold">BACK TO FEATURES</span>
        </Link>

        {/* Feature Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="border-4 border-black bg-red-500 text-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center space-x-6 mb-4">
              <div className="w-24 h-24 border-4 border-black bg-white flex items-center justify-center">
                <Link2 className="text-red-500" size={48} />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2 tracking-wider">URL-BASED DETECTION</h2>
                <p className="text-xl opacity-90">Transfer Learning Model</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Overview */}
          <Card>
            <h3 className="text-2xl font-bold mb-4 tracking-wide">OVERVIEW</h3>
            <p className="text-sm leading-relaxed mb-4">
              Our URL-based detection system employs state-of-the-art transfer learning techniques to identify malicious URLs with unprecedented accuracy. The model has been trained on millions of legitimate and phishing URLs, learning to recognize subtle patterns that indicate malicious intent.
            </p>
            <p className="text-sm leading-relaxed">
              By analyzing URL structure, domain characteristics, and linguistic patterns, the system can detect even sophisticated phishing attempts including homograph attacks, typosquatting, and subdomain manipulation.
            </p>
          </Card>

          {/* How It Works */}
          <Card>
            <h3 className="text-2xl font-bold mb-6 tracking-wide">HOW IT WORKS</h3>
            <div className="space-y-6">
              {[
                { num: '01', title: 'URL PARSING & FEATURE EXTRACTION', desc: 'The system breaks down the URL into components: protocol, domain, subdomain, path, and parameters. Each component is analyzed for suspicious characteristics.' },
                { num: '02', title: 'PATTERN RECOGNITION', desc: 'Advanced neural networks identify patterns associated with phishing, including character substitutions, unusual TLDs, and suspicious keyword combinations.' },
                { num: '03', title: 'TRANSFER LEARNING MODEL', desc: 'Pre-trained on massive datasets, the model transfers its knowledge to detect even novel phishing techniques that weren\'t in the original training data.' },
                { num: '04', title: 'CONFIDENCE SCORING', desc: 'The system outputs a probability score indicating the likelihood that the URL is malicious, allowing for nuanced decision-making.' }
              ].map((step) => (
                <div key={step.num} className="flex items-start space-x-4">
                  <div className="w-10 h-10 border-2 border-black bg-red-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">{step.title}</h4>
                    <p className="text-sm opacity-80">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Detection Capabilities */}
          <Card>
            <h3 className="text-2xl font-bold mb-6 tracking-wide">DETECTION CAPABILITIES</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {capabilities.map((capability, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-3 border-2 border-black hover:border-red-500 transition-colors duration-300">
                  <CheckCircle className="text-red-500 flex-shrink-0" size={20} />
                  <span className="text-sm font-bold">{capability}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Technical Specs */}
          <div className="border-4 border-black bg-black text-white p-8 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]">
            <h3 className="text-2xl font-bold mb-6 tracking-wide">TECHNICAL SPECIFICATIONS</h3>
            <div className="space-y-3 text-sm font-mono">
              {technicalSpecs.map((spec, idx) => (
                <div key={idx} className="flex justify-between border-b border-white border-opacity-30 pb-2">
                  <span className="opacity-70">{spec.label}:</span>
                  <span className={`font-bold ${spec.highlight ? 'text-red-500' : ''}`}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <Link to="/analyze">
              <Button variant="primary" size="large">
                TEST URL DETECTION NOW
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlDetectionDetail;
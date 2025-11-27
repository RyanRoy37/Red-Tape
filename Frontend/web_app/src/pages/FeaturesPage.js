// src/pages/FeaturesPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link2, Shield, Eye, FileText, Activity, Zap } from 'lucide-react';
import VintageTexture from '../components/common/VintageTexture';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/common/Button';

const FeaturesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const features = [
    {
      id: 'url-detection',
      icon: <Link2 size={48} />,
      title: 'URL-BASED DETECTION',
      subtitle: 'Transfer Learning Model',
      description: 'Advanced machine learning model trained on millions of URLs to identify malicious patterns, homograph attacks, and suspicious domain structures.',
      link: '/features/url-detection'
    },
    {
      id: 'certificate',
      icon: <Shield size={48} />,
      title: 'CERTIFICATE ANALYSIS',
      subtitle: 'SSL/TLS & Form Security',
      description: 'Comprehensive certificate validation and input form analysis to detect self-signed certificates, domain mismatches, and unencrypted data transmission.',
      link: '/features/certificate'
    },
    {
      id: 'logo',
      icon: <Eye size={48} />,
      title: 'LOGO-BASED DETECTION',
      subtitle: 'Vision Module',
      description: 'Computer vision algorithms that identify brand impersonation by comparing logos and visual elements against known legitimate brands.',
      link: '/features/logo-detection'
    },
    {
      id: 'content',
      icon: <FileText size={48} />,
      title: 'CONTENT ANALYSIS',
      subtitle: 'Formal Concept Analysis',
      description: 'Deep page content inspection using formal concept analysis to identify suspicious text patterns, misleading information, and social engineering tactics.',
      link: '/features/content-analysis'
    },
    {
      id: 'behavior',
      icon: <Activity size={48} />,
      title: 'BEHAVIOR ANALYSIS',
      subtitle: 'Network Request Monitoring',
      description: 'Real-time monitoring of network requests, redirect chains, and external domain connections to identify malicious behavior patterns.',
      link: '/features/behavior-analysis'
    },
    {
      id: 'hybrid',
      icon: <Zap size={48} />,
      title: 'HYBRID SCORING',
      subtitle: 'Multi-Model Integration',
      description: 'Intelligent fusion of all detection modules using ensemble learning to provide accurate, reliable phishing probability scores.',
      link: '/features/hybrid-scoring'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-mono relative overflow-hidden">
      <VintageTexture />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-wider relative inline-block">
            FEATURES
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-500"></span>
          </h2>
          <p className="text-lg mt-6 opacity-70 tracking-wide">
            MULTI-LAYERED DETECTION SYSTEM
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={feature.id}
              to={feature.link}
              className="block border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] hover:-translate-y-1 transition-all duration-300 group"
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
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link to="/analyze">
            <Button variant="secondary" size="large">
              TRY RED TAPE NOW
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
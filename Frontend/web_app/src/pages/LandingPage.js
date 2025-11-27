// src/pages/LandingPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VintageTexture from '../components/common/VintageTexture';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Menu } from 'lucide-react';

const LandingPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const installOptions = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: 'BROWSER PLUGIN',
      description: 'Real-time protection while browsing. Automatically scans URLs and alerts you of potential threats.',
      buttonText: 'INSTALL PLUGIN'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: 'RED BOX',
      description: 'Sandbox for a comprehensive visual and behavioural analysis. Advanced features and detailed reports.',
      buttonText: 'INSTALL RED BOX'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-mono relative overflow-hidden">
      <VintageTexture />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Menu button */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="fixed top-6 right-6 z-40 p-2 hover:bg-red-500 hover:text-white transition-all duration-300 border-2 border-black"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-20 mt-8">
          <h1 className="text-6xl md:text-8xl mb-4 tracking-wider font-bold relative inline-block">
            RED TAPE
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-500"></span>
          </h1>
          <p className="text-xl md:text-2xl mt-6 tracking-wide opacity-80">
            PHISHING DETECTION SYSTEM
          </p>
        </header>

        {/* Main CTA */}
        <div className="text-center mb-24">
          <Link to="/analyze">
            <Button variant="primary" size="large">
              TRY "RED-TAPE"
            </Button>
          </Link>
        </div>

        {/* Installation Options */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {installOptions.map((option, index) => (
            <Card key={index} className="group">
              <div className="mb-6">
                <div className="w-16 h-16 border-4 border-black bg-red-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-wide">{option.title}</h3>
                <p className="text-sm mb-6 leading-relaxed opacity-80">
                  {option.description}
                </p>
              </div>
              <Button variant="secondary" className="w-full">
                {option.buttonText}
              </Button>
            </Card>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
// src/pages/AnalysisPage.js
import React, { useState } from 'react';
import VintageTexture from '../components/common/VintageTexture';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import UrlInput from '../components/analysis/UrlInput';
import ResultsDisplay from '../components/analysis/ResultsDisplay';
import DetailedReport from '../components/analysis/DetailedReport';
import AiExplanation from '../components/analysis/AiExplanation';

const AnalysisPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock analysis data - Replace with actual API call
  const mockResults = {
    isPhishing: true,
    confidence: 87.5,
    details: {
      urlAnalysis: { 
        score: 92, 
        risk: 'HIGH', 
        flags: ['Suspicious TLD', 'Homograph attack detected', 'URL length anomaly'] 
      },
      certificateAnalysis: { 
        score: 75, 
        risk: 'MEDIUM', 
        flags: ['Self-signed certificate', 'Domain mismatch'] 
      },
      logoDetection: { 
        score: 95, 
        risk: 'HIGH', 
        flags: ['Logo similarity: 94% match with PayPal', 'Brand impersonation detected'] 
      },
      contentAnalysis: { 
        score: 80, 
        risk: 'HIGH', 
        flags: ['Suspicious form fields', 'Password input without encryption'] 
      },
      behaviorAnalysis: { 
        score: 88, 
        risk: 'HIGH', 
        flags: ['Unusual redirect patterns', 'Multiple external domains contacted'] 
      },
      hybridScore: { 
        score: 87.5, 
        risk: 'HIGH', 
        flags: ['Combined risk assessment: CRITICAL'] 
      }
    }
  };

  const handleAnalyze = () => {
    if (url.trim()) {
      setLoading(true);
      // Replace with actual API call
      setTimeout(() => {
        setAnalyzed(true);
        setLoading(false);
      }, 2000);
    }
  };

  const handleAiExplain = () => {
    // Replace with actual AI API call
    setAiExplanation(
      'Based on the comprehensive analysis of the provided URL, our AI system has identified multiple high-risk indicators suggesting this is a phishing attempt. The URL structure contains homographic characters designed to mimic a legitimate domain, while the certificate analysis reveals a self-signed certificate with domain mismatches. Our logo detection module found a 94% visual similarity with PayPal\'s official branding, indicating brand impersonation. The page content analysis detected unencrypted password fields and suspicious form structures commonly used in credential harvesting. Network behavior analysis revealed unusual redirect patterns and connections to multiple suspicious external domains. The hybrid scoring engine, combining all detection modules, assigns a CRITICAL risk level with 87.5% confidence that this is a phishing site.'
    );
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono relative overflow-hidden">
      <VintageTexture />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="container mx-auto px-6 py-12">
        {/* Analysis Section */}
        <div className={`max-w-4xl mx-auto transition-all duration-500 ${showDetailedReport ? 'mb-12' : ''}`}>
          <Card>
            <h2 className="text-2xl font-bold mb-6 tracking-wide">URL ANALYSIS</h2>
            
            <UrlInput 
              url={url}
              setUrl={setUrl}
              onAnalyze={handleAnalyze}
              loading={loading}
            />

            {analyzed && !loading && (
              <ResultsDisplay 
                results={mockResults}
                onShowDetailedReport={() => setShowDetailedReport(!showDetailedReport)}
              />
            )}
          </Card>
        </div>

        {/* Detailed Report Section */}
        {analyzed && showDetailedReport && (
          <>
            <DetailedReport 
              details={mockResults.details}
              onClose={() => setShowDetailedReport(false)}
              onAiExplain={handleAiExplain}
            />
            <AiExplanation explanation={aiExplanation} />
          </>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;
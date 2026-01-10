import React, { useState } from 'react';
import VintageTexture from '../components/common/VintageTexture';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import UrlInput from '../components/analysis/UrlInput';
import FeaturesList from '../components/analysis/FeaturesList';
import ScreenshotDisplay from '../components/analysis/ScreenshotDisplay';
import HtmlContentDisplay from '../components/analysis/HtmlContentDisplay';

const AdvancedAnalysisPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysisData(null);

    try {
      const response = await fetch('http://localhost:4000/api/advanced-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const data = await response.json();
      setAnalysisData(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze URL. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono relative overflow-hidden">
      <VintageTexture />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="container mx-auto px-6 py-12">
        {/* Input Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <h2 className="text-3xl font-bold mb-2 tracking-wide">ADVANCED URL ANALYSIS</h2>
            <p className="text-sm text-gray-600 mb-6">
              Comprehensive phishing detection with feature extraction and visual inspection
            </p>
            
            <UrlInput 
              url={url}
              setUrl={setUrl}
              onAnalyze={handleAnalyze}
              loading={loading}
            />

            {error && (
              <div className="mt-4 p-4 border-2 border-red-600 bg-red-50 text-red-800 font-bold">
                ⚠ ERROR: {error}
              </div>
            )}
          </Card>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="max-w-6xl mx-auto">
            <Card>
              <div className="text-center py-12">
                <div className="inline-block animate-spin text-6xl mb-4">⚙</div>
                <div className="text-xl font-bold mb-2">ANALYZING URL...</div>
                <div className="text-sm text-gray-600">
                  Extracting features, capturing screenshot, and analyzing content
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Results Section */}
        {analysisData && !loading && (
          <>
            {/* Two Column Layout - Features and Screenshot */}
            <div className="max-w-7xl mx-auto mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Features and Analysis */}
                <div>
                  <FeaturesList 
                    features={analysisData.features}
                    prediction={{
                      is_phishing: analysisData.is_phishing,
                      risk_score: analysisData.risk_score,
                      confidence: analysisData.confidence,
                      explanations: analysisData.explanations
                    }}
                  />
                </div>

                {/* Right Side - Screenshot */}
                <div>
                  <ScreenshotDisplay 
                    screenshot={analysisData.screenshot}
                    url={analysisData.url}
                  />
                </div>
              </div>
            </div>

            {/* HTML Content Section - Full Width */}
            <div className="max-w-7xl mx-auto">
              <HtmlContentDisplay htmlContent={analysisData.html_content} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdvancedAnalysisPage;
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AnalysisPage from './pages/AnalysisPage';
import FeaturesPage from './pages/FeaturesPage';
import UrlDetectionDetail from './pages/featureDetails/UrlDetectionDetail';
import AdvancedAnalysisPage from './pages/AdvancedAnalysisPage';
import DocsPage from './pages/DocsPage';
// import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<AnalysisPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/features/url-detection" element={<UrlDetectionDetail />} />
        <Route path="/advanced-analysis" element={<AdvancedAnalysisPage />} />
        <Route path="/docs" element={<DocsPage />} />
        {/* Add other feature detail routes */}
        {/* <Route path="/features/certificate" element={<CertificateDetail />} /> */}
        {/* <Route path="/features/logo-detection" element={<LogoDetectionDetail />} /> */}
        {/* <Route path="/features/content-analysis" element={<ContentAnalysisDetail />} /> */}
        {/* <Route path="/features/behavior-analysis" element={<BehaviorAnalysisDetail />} /> */}
        {/* <Route path="/features/hybrid-scoring" element={<HybridScoringDetail />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
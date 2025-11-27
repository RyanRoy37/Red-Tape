// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AnalysisPage from './pages/AnalysisPage';
import FeaturesPage from './pages/FeaturesPage';
import UrlDetectionDetail from './pages/featureDetails/UrlDetectionDetail';
// Import other feature detail pages as you create them
// import CertificateDetail from './pages/featureDetails/CertificateDetail';
// import LogoDetectionDetail from './pages/featureDetails/LogoDetectionDetail';
// import ContentAnalysisDetail from './pages/featureDetails/ContentAnalysisDetail';
// import BehaviorAnalysisDetail from './pages/featureDetails/BehaviorAnalysisDetail';
// import HybridScoringDetail from './pages/featureDetails/HybridScoringDetail';
// import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<AnalysisPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/features/url-detection" element={<UrlDetectionDetail />} />
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
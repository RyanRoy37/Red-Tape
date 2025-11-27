// src/components/analysis/DetailedReport.js
import React from 'react';
import { ChevronUp } from 'lucide-react';
import Button from '../common/Button';

const DetailedReport = ({ details, onClose, onAiExplain }) => {
  const reportSections = [
    { key: 'urlAnalysis', title: '1. URL-BASED DETECTION' },
    { key: 'certificateAnalysis', title: '2. CERTIFICATE & INPUT FORM ANALYSIS' },
    { key: 'logoDetection', title: '3. LOGO-BASED DETECTION' },
    { key: 'contentAnalysis', title: '4. PAGE CONTENT ANALYSIS' },
    { key: 'behaviorAnalysis', title: '5. SITE BEHAVIOR ANALYSIS' },
    { key: 'hybridScore', title: '6. HYBRID SCORING ENGINE' }
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-wide">DETAILED ANALYSIS REPORT</h2>
          <button
            onClick={onClose}
            className="text-sm hover:text-red-500 transition-colors duration-300"
            aria-label="Close detailed report"
          >
            <ChevronUp size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {reportSections.map((section, index) => {
            const data = details[section.key];
            const isLast = section.key === 'hybridScore';
            
            return (
              <div 
                key={section.key}
                className={`border-2 border-black p-4 ${isLast ? 'bg-red-50' : ''} hover:border-red-500 transition-colors duration-300`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{section.title}</h3>
                  <span 
                    className={`px-3 py-1 border-2 border-black ${
                      data.risk === 'HIGH' ? 'bg-red-500 text-white' : 
                      data.risk === 'MEDIUM' ? 'bg-yellow-300' : 'bg-green-300'
                    }`}
                  >
                    {data.risk}
                  </span>
                </div>
                <p className="text-sm mb-2">Score: {data.score}/100</p>
                <ul className="text-sm space-y-1 ml-4">
                  {data.flags.map((flag, idx) => (
                    <li key={idx} className="before:content-['▸'] before:mr-2 before:text-red-500">
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <Button
            onClick={onAiExplain}
            variant="secondary"
            size="large"
            className="w-full"
          >
            EXPLAIN WITH AI
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DetailedReport;
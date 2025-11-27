// src/components/analysis/ResultsDisplay.js
import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const ResultsDisplay = ({ results, onShowDetailedReport }) => {
  if (!results) return null;

  return (
    <div className="mt-8 space-y-6 animate-fadeIn">
      <div className="border-4 border-black p-6 bg-red-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {results.isPhishing ? (
              <AlertTriangle className="text-red-500" size={32} />
            ) : (
              <CheckCircle className="text-green-500" size={32} />
            )}
            <div>
              <h3 className="text-xl font-bold">
                {results.isPhishing ? 'PHISHING DETECTED' : 'SITE APPEARS SAFE'}
              </h3>
              <p className="text-sm opacity-70">
                Status: {results.isPhishing ? 'POSITIVE' : 'NEGATIVE'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">CONFIDENCE LEVEL:</span>
            <span className={`text-2xl font-bold ${results.isPhishing ? 'text-red-500' : 'text-green-500'}`}>
              {results.confidence}%
            </span>
          </div>
          <div className="w-full h-4 border-4 border-black bg-white">
            <div 
              className={`h-full transition-all duration-1000 ${results.isPhishing ? 'bg-red-500' : 'bg-green-500'}`}
              style={{width: `${results.confidence}%`}}
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onShowDetailedReport}
          className="text-red-500 hover:text-red-700 underline font-bold transition-colors duration-300"
        >
          Want detailed report? Check it out.
        </button>
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

export default ResultsDisplay;
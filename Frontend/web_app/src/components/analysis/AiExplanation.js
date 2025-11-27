// src/components/analysis/AiExplanation.js
import React from 'react';

const AiExplanation = ({ explanation }) => {
  if (!explanation) return null;

  return (
    <div className="mt-6 border-4 border-black p-6 bg-gray-50 animate-fadeIn">
      <h3 className="font-bold text-lg mb-4 flex items-center">
        <span className="mr-2">🤖</span> AI EXPLANATION
      </h3>
      <p className="text-sm leading-relaxed">{explanation}</p>

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

export default AiExplanation;
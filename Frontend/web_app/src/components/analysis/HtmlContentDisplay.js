import React, { useState } from 'react';
import Card from '../common/Card';

const HtmlContentDisplay = ({ htmlContent }) => {
  const [showRaw, setShowRaw] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!htmlContent) {
    return (
      <Card>
        <div className="border-b-2 border-black pb-4 mb-6">
          <h2 className="text-2xl font-bold tracking-wide">HTML CONTENT</h2>
        </div>
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-black bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            <div className="font-bold text-lg">Content Unavailable</div>
            <div className="text-sm text-gray-600 mt-2">
              Could not fetch HTML content
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const highlightSearchTerm = (text) => {
    if (!searchTerm) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
        <mark key={index} className="bg-yellow-300">{part}</mark> : part
    );
  };

  const getContentStats = () => {
    const lines = htmlContent.split('\n').length;
    const chars = htmlContent.length;
    const words = htmlContent.split(/\s+/).length;
    
    // Count forms
    const formMatches = htmlContent.match(/<form/gi);
    const forms = formMatches ? formMatches.length : 0;
    
    // Count input fields
    const inputMatches = htmlContent.match(/<input/gi);
    const inputs = inputMatches ? inputMatches.length : 0;
    
    // Count links
    const linkMatches = htmlContent.match(/<a /gi);
    const links = linkMatches ? linkMatches.length : 0;
    
    // Count scripts
    const scriptMatches = htmlContent.match(/<script/gi);
    const scripts = scriptMatches ? scriptMatches.length : 0;
    
    return { lines, chars, words, forms, inputs, links, scripts };
  };

  const stats = getContentStats();

  return (
    <Card>
      <div className="border-b-2 border-black pb-4 mb-6">
        <h2 className="text-2xl font-bold tracking-wide">HTML CONTENT ANALYSIS</h2>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-black p-3 text-center">
          <div className="text-2xl font-bold">{stats.lines}</div>
          <div className="text-xs">Lines</div>
        </div>
        <div className="border border-black p-3 text-center">
          <div className="text-2xl font-bold">{stats.forms}</div>
          <div className="text-xs">Forms</div>
        </div>
        <div className="border border-black p-3 text-center">
          <div className="text-2xl font-bold">{stats.inputs}</div>
          <div className="text-xs">Input Fields</div>
        </div>
        <div className="border border-black p-3 text-center">
          <div className="text-2xl font-bold">{stats.scripts}</div>
          <div className="text-xs">Scripts</div>
        </div>
      </div>

      {/* Search and Toggle */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search in HTML..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border-2 border-black font-mono focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="px-6 py-2 bg-black text-white font-bold hover:bg-red-600 transition-colors border-2 border-black"
        >
          {showRaw ? 'FORMATTED' : 'RAW HTML'}
        </button>
      </div>

      {/* Content Display */}
      <div className="border-2 border-black bg-gray-50 p-4 max-h-96 overflow-auto">
        <pre className="font-mono text-xs whitespace-pre-wrap break-words">
          {showRaw ? htmlContent : highlightSearchTerm(htmlContent)}
        </pre>
      </div>

      {/* Copy Button */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(htmlContent);
          alert('HTML content copied to clipboard!');
        }}
        className="mt-4 w-full px-6 py-3 bg-black text-white font-bold hover:bg-red-600 transition-colors border-2 border-black"
      >
        📋 COPY HTML TO CLIPBOARD
      </button>
    </Card>
  );
};

export default HtmlContentDisplay;
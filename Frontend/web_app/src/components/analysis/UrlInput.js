// src/components/analysis/UrlInput.js
import React from 'react';
import Button from '../common/Button';

const UrlInput = ({ url, setUrl, onAnalyze, loading }) => {
  return (
    <div className="space-y-6">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste your url here"
        className="w-full border-4 border-black p-4 text-lg focus:outline-none focus:border-red-500 transition-colors duration-300 font-mono"
        disabled={loading}
      />

      <Button
        onClick={onAnalyze}
        disabled={loading || !url.trim()}
        variant="primary"
        size="large"
        className="w-full"
      >
        {loading ? 'ANALYZING...' : 'ANALYZE'}
      </Button>
    </div>
  );
};

export default UrlInput;
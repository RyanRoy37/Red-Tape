// src/components/common/VintageTexture.js
import React from 'react';

const VintageTexture = () => {
  return (
    <div 
      className="absolute inset-0 opacity-5 pointer-events-none" 
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px)'
      }}
    />
  );
};

export default VintageTexture;
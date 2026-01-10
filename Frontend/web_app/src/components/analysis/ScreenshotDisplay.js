import React, { useState } from 'react';
import Card from '../common/Card';

const ScreenshotDisplay = ({ screenshot, url }) => {
  const [imageError, setImageError] = useState(false);

  if (!screenshot || imageError) {
    return (
      <Card>
        <div className="border-b-2 border-black pb-4 mb-6">
          <h2 className="text-2xl font-bold tracking-wide">SITE PREVIEW</h2>
        </div>
        <div className="flex items-center justify-center h-96 border-2 border-dashed border-black bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">📸</div>
            <div className="font-bold text-lg">Screenshot Unavailable</div>
            <div className="text-sm text-gray-600 mt-2">
              Could not capture site preview
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="border-b-2 border-black pb-4 mb-6">
        <h2 className="text-2xl font-bold tracking-wide">SITE PREVIEW</h2>
        <div className="text-xs text-gray-600 mt-2 break-all">{url}</div>
      </div>
      
      <div className="border-2 border-black overflow-hidden">
        <img 
          src={screenshot} 
          alt="Website Screenshot"
          className="w-full h-auto"
          onError={() => setImageError(true)}
        />
      </div>
      
      <div className="mt-4 text-xs text-gray-600 text-center">
        Screenshot captured at {new Date().toLocaleString()}
      </div>
    </Card>
  );
};

export default ScreenshotDisplay;
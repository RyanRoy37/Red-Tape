import React from 'react';
import Card from '../common/Card';

const FeaturesList = ({ features, prediction }) => {
  const featureDescriptions = {
    time_domain_activation: {
      name: 'Domain Age',
      description: 'Days since domain registration',
      unit: 'days'
    },
    time_domain_expiration: {
      name: 'Domain Expiration',
      description: 'Days until domain expires',
      unit: 'days'
    },
    ttl_hostname: {
      name: 'TTL Hostname',
      description: 'Time To Live value',
      unit: 'seconds'
    },
    asn_ip: {
      name: 'ASN IP',
      description: 'Autonomous System Number',
      unit: ''
    },
    qty_ip_resolved: {
      name: 'IP Addresses',
      description: 'Number of resolved IPs',
      unit: 'addresses'
    },
    qty_nameservers: {
      name: 'Nameservers',
      description: 'Number of nameservers',
      unit: 'servers'
    },
    qty_mx_servers: {
      name: 'MX Servers',
      description: 'Number of mail servers',
      unit: 'servers'
    },
    domain_spf: {
      name: 'SPF Record',
      description: 'Sender Policy Framework',
      unit: ''
    },
    tls_ssl_certificate: {
      name: 'SSL/TLS',
      description: 'Certificate validation',
      unit: ''
    },
    url_google_index: {
      name: 'URL Indexed',
      description: 'Google index status',
      unit: ''
    },
    domain_google_index: {
      name: 'Domain Indexed',
      description: 'Domain in Google',
      unit: ''
    },
    time_response: {
      name: 'Response Time',
      description: 'Server response time',
      unit: 'ms'
    }
  };

  const getRiskColor = (feature, value) => {
    // Binary features
    if (['domain_spf', 'tls_ssl_certificate', 'url_google_index', 'domain_google_index'].includes(feature)) {
      return value === 1 ? 'text-green-600' : 'text-red-600';
    }
    
    // Numeric features with thresholds
    if (feature === 'time_domain_activation') {
      if (value < 30) return 'text-red-600';
      if (value < 180) return 'text-yellow-600';
      return 'text-green-600';
    }
    
    if (feature === 'time_domain_expiration') {
      if (value < 30) return 'text-red-600';
      if (value < 90) return 'text-yellow-600';
      return 'text-green-600';
    }
    
    if (feature === 'time_response') {
      if (value > 3000) return 'text-red-600';
      if (value > 1000) return 'text-yellow-600';
      return 'text-green-600';
    }
    
    return 'text-black';
  };

  const formatValue = (feature, value) => {
    if (value === -1) return 'N/A';
    if (['domain_spf', 'tls_ssl_certificate', 'url_google_index', 'domain_google_index'].includes(feature)) {
      return value === 1 ? 'YES' : 'NO';
    }
    return value;
  };

  return (
    <Card>
      <div className="border-b-2 border-black pb-4 mb-6">
        <h2 className="text-2xl font-bold tracking-wide">ANALYSIS RESULTS</h2>
      </div>

      {/* Prediction Summary */}
      <div className="mb-8 p-4 border-2 border-black bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-lg">STATUS:</span>
          <span className={`font-bold text-xl ${prediction.is_phishing ? 'text-red-600' : 'text-green-600'}`}>
            {prediction.is_phishing ? '⚠ PHISHING DETECTED' : '✓ SAFE'}
          </span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold">RISK SCORE:</span>
          <span className="font-bold">{(prediction.risk_score).toFixed(1)}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold">CONFIDENCE:</span>
          <span className="font-bold uppercase">{prediction.confidence}</span>
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-4 border-b border-black pb-2">FEATURE ANALYSIS</h3>
        {Object.entries(features).map(([key, value]) => {
          const feature = featureDescriptions[key];
          if (!feature) return null;

          return (
            <div 
              key={key}
              className="border border-black p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex-1">
                  <div className="font-bold text-sm tracking-wide">{feature.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{feature.description}</div>
                </div>
                <div className={`font-bold text-lg ml-4 ${getRiskColor(key, value)}`}>
                  {formatValue(key, value)}
                  {value !== -1 && feature.unit && (
                    <span className="text-sm ml-1 text-gray-600">{feature.unit}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanations */}
      {prediction.explanations && prediction.explanations.length > 0 && (
        <div className="mt-8 p-4 border-2 border-black bg-yellow-50">
          <h3 className="text-lg font-bold mb-3">⚠ KEY FINDINGS</h3>
          <ul className="space-y-2">
            {prediction.explanations.map((explanation, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="mr-2">▸</span>
                <span>{explanation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default FeaturesList;
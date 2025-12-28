// Content script - injected into every page
// Creates and manages the terminal overlay using the API utility

// Import API utility (loaded via manifest)
let phishingAPI;

// Initialize API when available
function initAPI() {
  if (typeof PhishingAPI !== 'undefined') {
    phishingAPI = new PhishingAPI();
  } else {
    console.warn('PhishingAPI not loaded, using fallback');
  }
}

// Try to initialize immediately
initAPI();

let terminalOverlay = null;
let currentUrl = null;

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showTerminal") {
    showTerminal(request.url);
  }
  
  if (request.action === "showResult") {
    displayResult(request.result);
  }
  
  if (request.action === "showError") {
    displayError(request.error);
  }
  
  if (request.action === "autoScan") {
    autoScanUrl(request.url);
  }
  
  return true;
});

// Auto-scan when page loads
function autoScanUrl(url) {
  currentUrl = url;
  // Small delay to let page settle
  setTimeout(() => {
    showTerminal(url);
    initiateBackendScan(url);
  }, 500);
}

// Create and show terminal overlay
function showTerminal(url) {
  currentUrl = url;
  
  // Remove existing overlay if present
  if (terminalOverlay) {
    terminalOverlay.remove();
  }
  
  // Create overlay container
  terminalOverlay = document.createElement('div');
  terminalOverlay.id = 'retro-security-terminal';
  terminalOverlay.innerHTML = getLoadingHTML(url);
  
  document.body.appendChild(terminalOverlay);
  
  // Add event listeners
  attachEventListeners();
}

// Send scan request to backend via API utility or background script
async function initiateBackendScan(url) {
  try {
    // If API utility is available, use it directly
    if (phishingAPI) {
      const result = await phishingAPI.scanUrlWithRetry(url);
      displayResult(result);
    } else {
      // Fallback: use background script
      chrome.runtime.sendMessage({
        action: "scanFromContent",
        url: url
      });
    }
  } catch (error) {
    console.error('Scan error:', error);
    const errorType = error.message || 'CONNECTION_FAILED';
    displayError(errorType);
  }
}

// Display scan results
function displayResult(result) {
  if (!terminalOverlay) return;
  
  const isPhishing = result.is_phishing;
  const riskLevel = getRiskLevel(result.risk_score);
  
  terminalOverlay.innerHTML = getResultHTML(result, riskLevel);
  attachEventListeners();
}

// Display error message
function displayError(errorType) {
  if (!terminalOverlay) return;
  
  terminalOverlay.innerHTML = getErrorHTML(errorType);
  attachEventListeners();
}

// Get risk level from score
function getRiskLevel(score) {
  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}

// Attach event listeners to buttons
function attachEventListeners() {
  const closeBtn = terminalOverlay?.querySelector('#terminal-close');
  const proceedBtn = terminalOverlay?.querySelector('#terminal-proceed');
  const goBackBtn = terminalOverlay?.querySelector('#terminal-goback');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeTerminal);
  }
  
  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      closeTerminal();
    });
  }
  
  if (goBackBtn) {
    goBackBtn.addEventListener('click', () => {
      window.history.back();
      closeTerminal();
    });
  }
}

// Close terminal overlay
function closeTerminal() {
  if (terminalOverlay) {
    terminalOverlay.remove();
    terminalOverlay = null;
  }
}

// HTML Templates
function getLoadingHTML(url) {
  return `
    <div class="terminal-window">
      <div class="terminal-header">
        <span class="terminal-title">[ SECURITY SCAN IN PROGRESS ]</span>
        <button id="terminal-close" class="terminal-btn-close">✕</button>
      </div>
      <div class="terminal-body">
        <div class="terminal-section">
          <div class="terminal-label">TARGET</div>
          <div class="terminal-url">${escapeHtml(url)}</div>
        </div>
        
        <div class="terminal-section">
          <div class="scanner-container">
            <pre class="scanner-art">
╔════════════════════════════════════╗
║  ANALYZING THREAT SIGNATURES...   ║
║                                    ║
║    ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░    ║
║                                    ║
║  CHECKING DOMAIN REPUTATION...    ║
║  VERIFYING SSL CERTIFICATES...    ║
║  SCANNING FOR ANOMALIES...        ║
╚════════════════════════════════════╝
            </pre>
          </div>
        </div>
        
        <div class="terminal-status">STAND BY...</div>
      </div>
    </div>
  `;
}

function getResultHTML(result, riskLevel) {
  const isPhishing = result.is_phishing;
  const verdictClass = isPhishing ? 'verdict-danger' : 'verdict-safe';
  const verdictText = isPhishing ? 'PHISHING SUSPECTED' : 'SITE APPEARS SAFE';
  
  let explanationsHTML = '';
  if (result.explanations && result.explanations.length > 0) {
    explanationsHTML = result.explanations.map(exp => 
      `<div class="terminal-reason">► ${escapeHtml(exp)}</div>`
    ).join('');
  }
  
  const cacheNote = !isPhishing ? 
    '<div class="terminal-note">Result cached for faster future access</div>' : '';
  
  return `
    <div class="terminal-window">
      <div class="terminal-header">
        <span class="terminal-title">[ SECURITY SCAN COMPLETE ]</span>
        <button id="terminal-close" class="terminal-btn-close">✕</button>
      </div>
      <div class="terminal-body">
        <div class="terminal-section">
          <div class="terminal-label">TARGET</div>
          <div class="terminal-url">${escapeHtml(result.url)}</div>
        </div>
        
        <div class="terminal-section">
          <div class="terminal-label">VERDICT</div>
          <div class="terminal-verdict ${verdictClass}">${verdictText}</div>
        </div>
        
        <div class="terminal-section">
          <div class="terminal-label">RISK ASSESSMENT</div>
          <div class="terminal-risk">
            <span class="risk-score">${result.risk_score}</span>
            <span class="risk-level risk-${riskLevel.toLowerCase()}">${riskLevel} RISK</span>
          </div>
        </div>
        
        <div class="terminal-section">
          <div class="terminal-label">CONFIDENCE</div>
          <div class="terminal-confidence">${escapeHtml(result.confidence)}</div>
        </div>
        
        ${result.explanations && result.explanations.length > 0 ? `
        <div class="terminal-section">
          <div class="terminal-label">ANALYSIS</div>
          ${explanationsHTML}
        </div>
        ` : ''}
        
        ${cacheNote}
        
        <div class="terminal-actions">
          ${isPhishing ? `
            <button id="terminal-goback" class="terminal-btn btn-primary">GO BACK</button>
            <button id="terminal-proceed" class="terminal-btn btn-secondary">PROCEED ANYWAY</button>
          ` : `
            <button id="terminal-proceed" class="terminal-btn btn-primary">CONTINUE</button>
          `}
        </div>
      </div>
    </div>
  `;
}

function getErrorHTML(errorType) {
  let errorMessage = 'UNABLE TO CONNECT TO SECURITY SERVICE';
  let errorReasons = [
    '► Backend service unavailable',
    '► Check if localhost:4000 is running',
    '► Verify network connectivity'
  ];
  
  if (errorType === 'REQUEST_TIMEOUT') {
    errorMessage = 'SCAN TIMEOUT';
    errorReasons = [
      '► Request took too long to complete',
      '► Backend may be overloaded',
      '► Try again in a moment'
    ];
  } else if (errorType === 'SERVER_ERROR') {
    errorMessage = 'SERVER ERROR';
    errorReasons = [
      '► Backend returned an error',
      '► Service may be experiencing issues',
      '► Contact system administrator'
    ];
  }
  
  return `
    <div class="terminal-window">
      <div class="terminal-header">
        <span class="terminal-title">[ SYSTEM ERROR ]</span>
        <button id="terminal-close" class="terminal-btn-close">✕</button>
      </div>
      <div class="terminal-body">
        <div class="terminal-section">
          <div class="terminal-label">ERROR</div>
          <div class="terminal-error">${errorMessage}</div>
        </div>
        
        <div class="terminal-section">
          ${errorReasons.map(reason => `<div class="terminal-reason">${reason}</div>`).join('')}
        </div>
        
        <div class="terminal-actions">
          <button id="terminal-close" class="terminal-btn btn-primary">CLOSE</button>
        </div>
      </div>
    </div>
  `;
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
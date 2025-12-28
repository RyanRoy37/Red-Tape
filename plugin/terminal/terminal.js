// Terminal.js - Manages the terminal overlay display
// This file handles the visual presentation of scan results

class SecurityTerminal {
  constructor() {
    this.overlay = null;
    this.currentUrl = null;
    this.isVisible = false;
    
    this.init();
  }
  
  init() {
    // Listen for messages from parent window or extension
    window.addEventListener('message', (event) => {
      this.handleMessage(event.data);
    });
    
    // Attach event listeners to buttons
    this.attachEventListeners();
  }
  
  handleMessage(data) {
    if (!data || !data.action) return;
    
    switch (data.action) {
      case 'showLoading':
        this.showLoading(data.url);
        break;
      case 'showResult':
        this.showResult(data.result);
        break;
      case 'showError':
        this.showError(data.error);
        break;
      case 'hide':
        this.hide();
        break;
    }
  }
  
  showLoading(url) {
    this.currentUrl = url;
    this.isVisible = true;
    
    const overlay = document.getElementById('retro-security-terminal');
    if (overlay) {
      overlay.style.display = 'flex';
    }
    
    // Update URL display
    const urlElement = document.getElementById('terminal-url');
    if (urlElement) {
      urlElement.textContent = url;
    }
    
    // Show loading section
    const loadingSection = document.getElementById('loading-section');
    const resultsSection = document.getElementById('results-section');
    const errorSection = document.getElementById('error-section');
    const actionsSection = document.getElementById('terminal-actions');
    
    if (loadingSection) loadingSection.style.display = 'block';
    if (resultsSection) resultsSection.style.display = 'none';
    if (errorSection) errorSection.style.display = 'none';
    if (actionsSection) actionsSection.style.display = 'none';
    
    // Update header
    const headerTitle = document.querySelector('.terminal-title');
    if (headerTitle) {
      headerTitle.textContent = '[ SECURITY SCAN IN PROGRESS ]';
    }
  }
  
  showResult(result) {
    this.isVisible = true;
    
    // Hide loading, show results
    const loadingSection = document.getElementById('loading-section');
    const resultsSection = document.getElementById('results-section');
    const errorSection = document.getElementById('error-section');
    const actionsSection = document.getElementById('terminal-actions');
    
    if (loadingSection) loadingSection.style.display = 'none';
    if (errorSection) errorSection.style.display = 'none';
    if (resultsSection) resultsSection.style.display = 'block';
    if (actionsSection) actionsSection.style.display = 'flex';
    
    // Update header
    const headerTitle = document.querySelector('.terminal-title');
    if (headerTitle) {
      headerTitle.textContent = '[ SECURITY SCAN COMPLETE ]';
    }
    
    // Update URL
    const urlElement = document.getElementById('terminal-url');
    if (urlElement && result.url) {
      urlElement.textContent = result.url;
    }
    
    // Update verdict
    const isPhishing = result.is_phishing;
    const verdictElement = document.getElementById('terminal-verdict');
    if (verdictElement) {
      verdictElement.textContent = isPhishing ? 'PHISHING SUSPECTED' : 'SITE APPEARS SAFE';
      verdictElement.className = isPhishing ? 'terminal-verdict verdict-danger' : 'terminal-verdict verdict-safe';
    }
    
    // Update risk score
    const riskScoreElement = document.getElementById('risk-score');
    if (riskScoreElement) {
      riskScoreElement.textContent = result.risk_score;
    }
    
    // Update risk level
    const riskLevel = this.getRiskLevel(result.risk_score);
    const riskLevelElement = document.getElementById('risk-level');
    if (riskLevelElement) {
      riskLevelElement.textContent = `${riskLevel} RISK`;
      riskLevelElement.className = `risk-level risk-${riskLevel.toLowerCase()}`;
    }
    
    // Update confidence
    const confidenceElement = document.getElementById('terminal-confidence');
    if (confidenceElement) {
      confidenceElement.textContent = result.confidence || 'Assessment complete';
    }
    
    // Update explanations
    const explanationsContainer = document.getElementById('terminal-explanations');
    const explanationsSection = document.getElementById('explanations-section');
    if (explanationsContainer && result.explanations && result.explanations.length > 0) {
      explanationsContainer.innerHTML = result.explanations
        .map(exp => `<div class="terminal-reason">► ${this.escapeHtml(exp)}</div>`)
        .join('');
      if (explanationsSection) explanationsSection.style.display = 'block';
    } else {
      if (explanationsSection) explanationsSection.style.display = 'none';
    }
    
    // Show/hide cache note for safe sites
    const cacheNote = document.getElementById('cache-note');
    if (cacheNote) {
      cacheNote.style.display = isPhishing ? 'none' : 'block';
    }
    
    // Update action buttons
    const goBackBtn = document.getElementById('terminal-goback');
    const proceedBtn = document.getElementById('terminal-proceed');
    
    if (isPhishing) {
      // Phishing detected: show both buttons
      if (goBackBtn) {
        goBackBtn.style.display = 'inline-block';
        goBackBtn.textContent = 'GO BACK';
      }
      if (proceedBtn) {
        proceedBtn.textContent = 'PROCEED ANYWAY';
        proceedBtn.className = 'terminal-btn btn-secondary';
      }
    } else {
      // Safe site: show only continue button
      if (goBackBtn) {
        goBackBtn.style.display = 'none';
      }
      if (proceedBtn) {
        proceedBtn.textContent = 'CONTINUE';
        proceedBtn.className = 'terminal-btn btn-primary';
      }
    }
  }
  
  showError(errorType) {
    this.isVisible = true;
    
    // Hide loading and results, show error
    const loadingSection = document.getElementById('loading-section');
    const resultsSection = document.getElementById('results-section');
    const errorSection = document.getElementById('error-section');
    const actionsSection = document.getElementById('terminal-actions');
    
    if (loadingSection) loadingSection.style.display = 'none';
    if (resultsSection) resultsSection.style.display = 'none';
    if (errorSection) errorSection.style.display = 'block';
    if (actionsSection) actionsSection.style.display = 'flex';
    
    // Update header
    const headerTitle = document.querySelector('.terminal-title');
    if (headerTitle) {
      headerTitle.textContent = '[ SYSTEM ERROR ]';
    }
    
    // Update error message
    const errorMessage = document.getElementById('error-message');
    const errorDetails = document.getElementById('error-details');
    
    if (errorType === 'CONNECTION_FAILED') {
      if (errorMessage) {
        errorMessage.textContent = 'UNABLE TO CONNECT TO SECURITY SERVICE';
      }
      if (errorDetails) {
        errorDetails.innerHTML = `
          <div class="terminal-reason">► Backend service unavailable</div>
          <div class="terminal-reason">► Check if localhost:4000 is running</div>
          <div class="terminal-reason">► Verify network connectivity</div>
        `;
      }
    } else if (errorType === 'REQUEST_TIMEOUT') {
      if (errorMessage) {
        errorMessage.textContent = 'SCAN TIMEOUT';
      }
      if (errorDetails) {
        errorDetails.innerHTML = `
          <div class="terminal-reason">► Request took too long to complete</div>
          <div class="terminal-reason">► Backend may be overloaded</div>
          <div class="terminal-reason">► Try again in a moment</div>
        `;
      }
    } else if (errorType === 'SERVER_ERROR') {
      if (errorMessage) {
        errorMessage.textContent = 'SERVER ERROR';
      }
      if (errorDetails) {
        errorDetails.innerHTML = `
          <div class="terminal-reason">► Backend returned an error</div>
          <div class="terminal-reason">► Service may be experiencing issues</div>
          <div class="terminal-reason">► Contact system administrator</div>
        `;
      }
    } else {
      if (errorMessage) {
        errorMessage.textContent = 'SCAN FAILED';
      }
      if (errorDetails) {
        errorDetails.innerHTML = `
          <div class="terminal-reason">► Unable to complete security scan</div>
          <div class="terminal-reason">► Please try again</div>
        `;
      }
    }
    
    // Update buttons for error state
    const goBackBtn = document.getElementById('terminal-goback');
    const proceedBtn = document.getElementById('terminal-proceed');
    
    if (goBackBtn) {
      goBackBtn.style.display = 'none';
    }
    if (proceedBtn) {
      proceedBtn.textContent = 'CLOSE';
      proceedBtn.className = 'terminal-btn btn-primary';
    }
  }
  
  hide() {
    const overlay = document.getElementById('retro-security-terminal');
    if (overlay) {
      overlay.style.display = 'none';
    }
    this.isVisible = false;
  }
  
  attachEventListeners() {
    // Close button
    const closeBtn = document.getElementById('terminal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.hide();
        window.parent.postMessage({ action: 'terminalClosed' }, '*');
      });
    }
    
    // Proceed button
    const proceedBtn = document.getElementById('terminal-proceed');
    if (proceedBtn) {
      proceedBtn.addEventListener('click', () => {
        this.hide();
        window.parent.postMessage({ action: 'terminalClosed' }, '*');
      });
    }
    
    // Go back button
    const goBackBtn = document.getElementById('terminal-goback');
    if (goBackBtn) {
      goBackBtn.addEventListener('click', () => {
        this.hide();
        window.parent.postMessage({ action: 'goBack' }, '*');
      });
    }
  }
  
  getRiskLevel(score) {
    if (score >= 70) return 'HIGH';
    if (score >= 40) return 'MEDIUM';
    return 'LOW';
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize terminal when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SecurityTerminal();
  });
} else {
  new SecurityTerminal();
}

// Export for use in other contexts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SecurityTerminal;
} else {
  window.SecurityTerminal = SecurityTerminal;
}
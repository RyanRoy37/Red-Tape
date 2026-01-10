// Popup logic

document.addEventListener('DOMContentLoaded', () => {
  checkBackendStatus();
  
  // Scan current page button
  document.getElementById('scan-current').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url) {
        const url = tabs[0].url;
        
        // Check if URL is scannable
        if (url.startsWith('http://') || url.startsWith('https://')) {
          // Send message to background script
          chrome.runtime.sendMessage({
            action: "scanUrl",
            url: url
          });
          
          // Close popup
          window.close();
        } else {
          updateStatus('CANNOT SCAN THIS PAGE', 'offline');
        }
      }
    });
  });
  
  // Settings button (placeholder)
  document.getElementById('open-settings').addEventListener('click', () => {
    alert('Settings feature coming soon!\n\nFuture features:\n- Auto-scan toggle\n- Whitelist domains\n- Notification preferences');
  });
});

// Check if backend is online
function checkBackendStatus() {
  fetch('http://localhost:4000/endpoints/scan_url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: 'https://example.com' })
  })
    .then(res => {
      if (res.ok) {
        updateStatus('ONLINE', 'online');
      } else {
        updateStatus('SERVICE ERROR', 'offline');
      }
    })
    .catch(err => {
      updateStatus('OFFLINE', 'offline');
    });
}

// Update status indicator
function updateStatus(text, status) {
  const statusText = document.getElementById('status-text');
  const statusDot = document.querySelector('.status-dot');
  
  if (statusText) {
    statusText.textContent = text;
  }
  
  if (statusDot) {
    statusDot.className = 'status-dot';
    if (status === 'online') {
      statusDot.classList.add('online');
    } else if (status === 'offline') {
      statusDot.classList.add('offline');
    }
  }
}
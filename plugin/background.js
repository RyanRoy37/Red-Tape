// Background service worker
// Handles messages between popup and content script

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scanUrl") {
    // Forward scan request to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "showTerminal",
          url: request.url
        });
      }
    });
  }
  
  if (request.action === "scanFromContent") {
    // Scan initiated from content script
    fetch("http://localhost:4000/endpoints/scan_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: request.url })
    })
      .then(res => res.json())
      .then(data => {
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "showResult",
          result: data
        });
      })
      .catch(err => {
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "showError",
          error: "CONNECTION_FAILED"
        });
      });
  }
  
  return true;
});

// Listen for tab updates to auto-scan new URLs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Check if URL should be scanned (skip chrome:// and extension pages)
    if (tab.url.startsWith('http://') || tab.url.startsWith('https://')) {
      chrome.tabs.sendMessage(tabId, {
        action: "autoScan",
        url: tab.url
      });
    }
  }
});
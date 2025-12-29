// background.js
// Service Worker (Manifest V3)
// Handles ONLY backend communication

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Accept scan requests only from content scripts
  if (request.type !== "SCAN_URL") return;
  if (!sender || !sender.tab) return;

  const { url } = request;

  // Basic validation
  if (typeof url !== "string" || !url.startsWith("http")) {
    sendResponse({
      success: false,
      error: "INVALID_URL"
    });
    return;
  }

  // Timeout protection
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  fetch("http://localhost:4000/endpoints/scan_url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url }),
    signal: controller.signal
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("SERVER_ERROR");
      }
      return response.json();
    })
    .then(data => {
      sendResponse({
        success: true,
        result: data
      });
    })
    .catch(error => {
      let errorType = "CONNECTION_FAILED";

      if (error.name === "AbortError") {
        errorType = "REQUEST_TIMEOUT";
      } else if (error.message === "SERVER_ERROR") {
        errorType = "SERVER_ERROR";
      }

      sendResponse({
        success: false,
        error: errorType
      });
    })
    .finally(() => {
      clearTimeout(timeoutId);
    });

  // REQUIRED for async response
  return true;
});

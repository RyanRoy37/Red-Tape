// content.js
// Injected into webpages
// Responsible ONLY for UI, user interaction, and messaging background

let terminalOverlay = null;
let currentUrl = null;
let scanInProgress = false;

/* =========================
   AUTO SCAN ON PAGE LOAD
========================= */
(function autoScan() {
  if (window.top !== window) return; // prevent iframes
  if (scanInProgress) return;

  const url = window.location.href;
  if (!url.startsWith("http://") && !url.startsWith("https://")) return;

  scanInProgress = true;
  currentUrl = url;

  setTimeout(() => {
    showTerminal(url);
    requestScan(url);
  }, 500);
})();

/* =========================
   BACKGROUND COMMUNICATION
========================= */
function requestScan(url) {
  chrome.runtime.sendMessage(
    {
      type: "SCAN_URL",
      url
    },
    (response) => {
      if (!response || !response.success) {
        displayError(response?.error || "CONNECTION_FAILED");
        scanInProgress = false;
        return;
      }
      displayResult(response.result);
      scanInProgress = false;
    }
  );
}

/* =========================
   UI: TERMINAL OVERLAY
========================= */
function showTerminal(url) {
  removeTerminal();

  terminalOverlay = document.createElement("div");
  terminalOverlay.id = "retro-security-terminal";
  terminalOverlay.setAttribute("tabindex", "-1");
  terminalOverlay.innerHTML = getLoadingHTML(url);

  document.documentElement.appendChild(terminalOverlay);
  attachEventListeners();
}

function removeTerminal() {
  if (terminalOverlay) {
    terminalOverlay.remove();
    terminalOverlay = null;
  }
}

/* =========================
   RESULT HANDLING
========================= */
function displayResult(result) {
  if (!terminalOverlay) return;

  const riskLevel = getRiskLevel(result.risk_score);
  terminalOverlay.innerHTML = getResultHTML(result, riskLevel);
  attachEventListeners();
}

function displayError(type) {
  if (!terminalOverlay) return;

  terminalOverlay.innerHTML = getErrorHTML(type);
  attachEventListeners();
}

/* =========================
   EVENT HANDLERS
========================= */
function attachEventListeners() {
  const closeBtn = terminalOverlay?.querySelector("#terminal-close");
  const proceedBtn = terminalOverlay?.querySelector("#terminal-proceed");
  const goBackBtn = terminalOverlay?.querySelector("#terminal-goback");

  closeBtn?.addEventListener("click", removeTerminal);

  proceedBtn?.addEventListener("click", () => {
    removeTerminal();
  });

  goBackBtn?.addEventListener("click", () => {
    removeTerminal();
    history.back();
  });
}

/* =========================
   RISK UTILS
========================= */
function getRiskLevel(score) {
  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}

/* =========================
   HTML TEMPLATES
========================= */
function getLoadingHTML(url) {
  return `
    <div class="terminal-window">
      <div class="terminal-header">
        <span class="terminal-title">[ SECURITY SCAN IN PROGRESS ]</span>
        <button id="terminal-close" class="terminal-btn-close">✕</button>
      </div>

      <div class="terminal-body">
        <!-- URL Section -->
        <div class="terminal-section">
          <div class="terminal-label">TARGET</div>
          <div class="terminal-url">${escapeHtml(url)}</div>
        </div>

        <!-- Status/Loading Section -->
        <div class="terminal-section" id="loading-section">
          <div class="scanner-container">
            <div class="loader"></div>
            <pre class="scanner-art">
╔════════════════════════════════════╗
║  ANALYZING THREAT SIGNATURES...    ║
║  CHECKING SITE CONTENT...          ║
║  SCANNING FOR ANOMALIES...         ║
╚════════════════════════════════════╝
            </pre>
          </div>
          <div class="terminal-status">STAND BY...</div>
        </div>
      </div>
    </div>
  `;
}


function getResultHTML(result, riskLevel) {
  const phishing = result.is_phishing;
  const verdictText = phishing ? "PHISHING SUSPECTED" : "NO IMMEDIATE THREAT";
  const verdictClass = phishing ? "danger" : "safe";

  const reasons = (result.explanations || [])
    .map(r => `<div class="terminal-reason">► ${escapeHtml(r)}</div>`)
    .join("");

  return `
    <div class="terminal-window">
      <div class="terminal-header">
        <span>[ SCAN COMPLETE ]</span>
        <button id="terminal-close" class="terminal-btn-close">✕</button>
      </div>

      <div class="terminal-body">
        <div class="terminal-label">TARGET</div>
        <div class="terminal-url">${escapeHtml(result.url)}</div>

        <div class="terminal-label">VERDICT</div>
        <div class="terminal-verdict ${verdictClass}">${verdictText}</div>

        <div class="terminal-label">RISK SCORE</div>
        <div>${result.risk_score} / 100 (${riskLevel})</div>

        <div class="terminal-label">CONFIDENCE</div>
        <div>${escapeHtml(result.confidence)}</div>

        ${reasons ? `<div class="terminal-label">ANALYSIS</div>${reasons}` : ""}

        <div class="terminal-actions">
          ${
            phishing
              ? `<button id="terminal-goback" class="terminal-action">GO BACK</button>
                 <button id="terminal-proceed" class="terminal-action">PROCEED ANYWAY</button>`
              : `<button id="terminal-proceed" class="terminal-action">CONTINUE</button>`
          }
        </div>
      </div>
    </div>
  `;
}

function getErrorHTML(type) {
  let message = "UNABLE TO CONNECT TO SECURITY SERVICE";

  if (type === "REQUEST_TIMEOUT") message = "SCAN TIMED OUT";
  if (type === "SERVER_ERROR") message = "SECURITY SERVICE ERROR";

  return `
    <div class="terminal-window">
      <div class="terminal-header">
        <span>[ ERROR ]</span>
        <button id="terminal-close">✕</button>
      </div>
      <div class="terminal-body">
        <div>${message}</div>
        <div>► Check backend service</div>
        <div>► Try again later</div>
      </div>
    </div>
  `;
}

/* =========================
   SANITIZATION
========================= */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

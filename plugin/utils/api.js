// api.js
// Background-only API utility
// Handles backend communication with retry & timeout

const API_CONFIG = {
  BASE_URL: "http://localhost:4000",
  SCAN_ENDPOINT: "/endpoints/scan_url",
  TIMEOUT: 15000,
  RETRIES: 2,
  RETRY_DELAY: 1000
};

class PhishingAPI {
  async scanUrl(url) {
    return this._retry(async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      try {
        const res = await fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.SCAN_ENDPOINT}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
            signal: controller.signal
          }
        );

        if (!res.ok) throw new Error("SERVER_ERROR");
        const data = await res.json();

        if (!this._validate(data)) {
          throw new Error("INVALID_RESPONSE");
        }

        return data;
      } catch (err) {
        if (err.name === "AbortError") throw new Error("REQUEST_TIMEOUT");
        if (err.message === "Failed to fetch") throw new Error("CONNECTION_FAILED");
        throw err;
      } finally {
        clearTimeout(timer);
      }
    });
  }

  async _retry(fn) {
    let lastError;
    for (let i = 0; i <= API_CONFIG.RETRIES; i++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        if (i < API_CONFIG.RETRIES) {
          await new Promise(r => setTimeout(r, API_CONFIG.RETRY_DELAY));
        }
      }
    }
    throw lastError;
  }

  _validate(data) {
    return (
      data &&
      typeof data.url === "string" &&
      typeof data.is_phishing === "boolean" &&
      typeof data.risk_score === "number"
    );
  }
}

const phishingAPI = new PhishingAPI();
self.phishingAPI = phishingAPI;

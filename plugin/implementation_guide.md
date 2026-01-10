# Implementation Guide - Retro Security Terminal

## 🎯 Overview

This browser extension displays phishing analysis results in a retro terminal interface. It consists of three main components:

1. **Extension Core** - Background worker and content script
2. **Terminal Display** - Retro UI overlay
3. **API Communication** - Backend integration

## 📦 Complete File List

### Required Files (Must Create)

```
✅ manifest.json          - Extension configuration
✅ background.js          - Service worker
✅ content.js             - Content script injected into pages
✅ popup.html             - Extension popup UI
✅ popup.js               - Popup functionality
✅ popup.css              - Popup styling
✅ terminal/terminal.html - Terminal overlay template
✅ terminal/terminal.js   - Terminal display logic
✅ terminal/terminal.css  - Retro styling
✅ utils/api.js           - Backend API helper
✅ README.md              - Documentation
✅ test-terminal.html     - Standalone test page
```

### Asset Files (Need to Create)

```
⚠️ assets/icon16.png      - 16x16 extension icon
⚠️ assets/icon48.png      - 48x48 extension icon
⚠️ assets/icon128.png     - 128x128 extension icon
```

## 🔧 How It Works

### 1. Page Load Flow

```
User visits website
      ↓
Content script injected
      ↓
Auto-scan triggered (500ms delay)
      ↓
Terminal overlay appears (loading state)
      ↓
API call to localhost:4000
      ↓
Backend returns results
      ↓
Terminal displays verdict
      ↓
User chooses action (proceed/go back)
```

### 2. Component Communication

```
┌─────────────┐
│   Popup     │ ← User clicks extension icon
└──────┬──────┘
       │
       ↓ sendMessage
┌─────────────┐
│ Background  │ ← Coordinates between components
└──────┬──────┘
       │
       ↓ sendMessage
┌─────────────┐
│   Content   │ ← Injects terminal, calls API
└──────┬──────┘
       │
       ↓ HTTP POST
┌─────────────┐
│   Backend   │ ← localhost:4000/endpoints/scan_url
└─────────────┘
```

### 3. Terminal Display States

**State 1: LOADING**
- Shows ASCII scanner art
- Animated progress indicators
- "STAND BY..." message

**State 2: SAFE RESULT**
- White verdict box
- Low/Medium risk score
- Continue button only
- Cache notification

**State 3: PHISHING DETECTED**
- Red pulsing verdict box
- High risk score
- Both "GO BACK" and "PROCEED ANYWAY" buttons
- Detailed threat analysis

**State 4: ERROR**
- Red error message
- Connection failure details
- Close button only

## 🎨 Design Specifications

### Color Scheme

```css
Primary Red:   #ff0000
Background:    #1a1a1a
Deep Black:    #0a0a0a
White Text:    #ffffff
Gray Text:     #cccccc
Border:        #333333
Warning:       #ffaa00
```

### Typography

```css
Font: 'Courier New', 'Consolas', monospace
Sizes:
  - Headers: 14-18px
  - Body: 12-13px
  - Labels: 10-11px
Letter Spacing: 1-3px (uppercase text)
```

### Animations

- **Fade In**: Terminal appears with opacity 0→1 (0.3s)
- **Slide In**: Terminal scales 0.8→1 with translateY (0.4s)
- **Pulse**: Danger boxes glow (2s infinite)
- **Blink**: Status text opacity (1.5s infinite)
- **Scanlines**: Vertical movement effect (6-8s infinite)

## 🔌 API Integration

### Request Format

```javascript
POST http://localhost:4000/endpoints/scan_url
Content-Type: application/json

{
  "url": "https://example.com"
}
```

### Response Format

```javascript
{
  "url": "https://example.com",
  "is_phishing": false,          // boolean
  "risk_score": 15,               // 0-100
  "confidence": "High confidence", // string
  "explanations": [               // array of strings
    "Domain has valid SSL certificate",
    "No suspicious redirects detected"
  ]
}
```

### Error Handling

The `utils/api.js` handles:
- **CONNECTION_FAILED** - Backend unreachable
- **REQUEST_TIMEOUT** - Request took >30s
- **SERVER_ERROR** - Backend returned HTTP error
- **INVALID_RESPONSE** - Malformed JSON or missing fields

### Retry Logic

- Automatic retry: 2 attempts
- Retry delay: 1s, 2s (exponential)
- Timeout: 30s per attempt

## 🧪 Testing

### Test Scenarios

1. **Safe Website**
   ```json
   {
     "url": "https://google.com",
     "is_phishing": false,
     "risk_score": 5,
     "confidence": "High confidence",
     "explanations": ["Valid SSL", "Old domain"]
   }
   ```

2. **Phishing Site**
   ```json
   {
     "url": "https://paypa1.com",
     "is_phishing": true,
     "risk_score": 95,
     "confidence": "Very high confidence",
     "explanations": ["Domain mimics PayPal", "New domain", "No SSL"]
   }
   ```

3. **Medium Risk**
   ```json
   {
     "url": "https://new-shop.net",
     "is_phishing": false,
     "risk_score": 55,
     "confidence": "Moderate confidence",
     "explanations": ["New domain", "Limited reputation"]
   }
   ```

### Using test-terminal.html

1. Open `test-terminal.html` in browser
2. Click test buttons to simulate different scenarios
3. Verify styling, animations, and button behavior
4. Test custom JSON with your own data

### Extension Testing

1. Load extension in Chrome
2. Visit test URLs
3. Check console for errors (F12)
4. Verify terminal appears automatically
5. Test manual scan via popup
6. Test with backend offline (error state)

## 🚀 Deployment Checklist

### Before Loading Extension

- [ ] All files created and in correct locations
- [ ] Icon images added to `assets/` folder
- [ ] Backend running on `localhost:4000`
- [ ] Backend accepts POST to `/endpoints/scan_url`
- [ ] Backend returns correct JSON format

### Loading Extension

- [ ] Open `chrome://extensions/`
- [ ] Enable Developer mode
- [ ] Click "Load unpacked"
- [ ] Select project folder
- [ ] No errors in extension console
- [ ] Icon appears in toolbar

### Post-Installation Testing

- [ ] Click extension icon → popup appears
- [ ] Status shows "ONLINE" (backend running)
- [ ] Visit test URL → terminal appears
- [ ] Terminal shows loading animation
- [ ] Results display correctly
- [ ] Buttons work (close, proceed, go back)
- [ ] Safe sites show cache note
- [ ] Phishing sites show both buttons
- [ ] Error state works (stop backend)

## 🔒 Security Considerations

### What This Extension Does

✅ Displays results from backend
✅ Sends URLs to localhost backend
✅ Allows user choice (always)
✅ Shows clear warnings

### What This Extension Does NOT Do

❌ Block or redirect pages
❌ Store URLs or history
❌ Send data to external servers
❌ Make security decisions for user
❌ Perform actual phishing detection

## 🐛 Troubleshooting

### Terminal Doesn't Appear

**Problem**: No overlay shows when visiting pages

**Solutions**:
1. Check if extension is enabled
2. Refresh page after loading extension
3. Check console for JavaScript errors
4. Verify `content.js` is injected (DevTools → Sources)

### "OFFLINE" Status in Popup

**Problem**: Popup shows backend offline

**Solutions**:
1. Start backend: `http://localhost:4000`
2. Test backend: `curl -X POST http://localhost:4000/endpoints/scan_url -d '{"url":"test"}'`
3. Check CORS settings on backend
4. Verify port 4000 is not blocked

### Terminal Shows Error

**Problem**: Error message appears instead of results

**Solutions**:
1. Check backend is running
2. Verify API endpoint path
3. Check backend returns valid JSON
4. Look at Network tab (F12) for failed requests

### Styling Issues

**Problem**: Terminal looks wrong or unstyled

**Solutions**:
1. Verify `terminal.css` loaded (Network tab)
2. Check for CSS conflicts with page styles
3. Clear browser cache
4. Ensure CSS file path correct in manifest

### API Not Responding

**Problem**: Request times out or fails

**Solutions**:
1. Check backend logs for errors
2. Increase timeout in `utils/api.js`
3. Verify request format matches backend expectation
4. Test backend with Postman/curl first

## 📝 Customization Guide

### Change Colors

Edit `terminal/terminal.css`:

```css
/* Change red to blue */
#ff0000 → #0000ff
#cc0000 → #0000cc

/* Change background */
#1a1a1a → #your-color
#0a0a0a → #your-color
```

### Modify Loading Animation

Edit `content.js` → `getLoadingHTML()`:

```javascript
// Change ASCII art
<pre class="scanner-art">
  Your custom ASCII art here
</pre>
```

### Adjust Auto-Scan Timing

Edit `content.js` → `autoScanUrl()`:

```javascript
// Change 500ms delay
setTimeout(() => {
  showTerminal(url);
  initiateBackendScan(url);
}, 500); // ← Change this value
```

### Add New Risk Levels

Edit `content.js` → `getRiskLevel()`:

```javascript
function getRiskLevel(score) {
  if (score >= 90) return "CRITICAL"; // New level
  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}
```

### Change API Endpoint

Edit `utils/api.js`:

```javascript
const API_CONFIG = {
  BASE_URL: 'http://localhost:4000', // Change host/port
  ENDPOINTS: {
    SCAN_URL: '/endpoints/scan_url'   // Change path
  }
};
```

## 🎓 Architecture Decisions

### Why Manifest V3?

Manifest V3 is the current standard and required for new Chrome extensions. It provides:
- Better security model
- Service workers instead of background pages
- Improved performance

### Why Content Script?

Content scripts inject into pages to:
- Create overlay DOM elements
- Access page context
- Respond immediately to page loads

### Why Standalone Terminal Files?

`terminal.html` and `terminal.js` are standalone so they can:
- Be tested independently
- Be reused in other projects
- Work without extension context

### Why API Utility?

`utils/api.js` provides:
- Centralized error handling
- Retry logic
- Timeout management
- Response validation
- Easy endpoint configuration

## 📚 Additional Resources

### Chrome Extension Documentation
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/)
- [Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
- [Message Passing](https://developer.chrome.com/docs/extensions/mv3/messaging/)

### Testing Tools
- Chrome DevTools
- Extension Reload (Ctrl+R on extensions page)
- Console logging (all extension contexts)

### Performance Tips
- Use throttling for auto-scan
- Cache safe site results
- Minimize DOM operations
- Use CSS animations over JavaScript

## 🤝 Contributing

When adding features:
1. Update this implementation guide
2. Add tests to `test-terminal.html`
3. Update README.md
4. Test in both Chrome and Edge
5. Verify backend compatibility

---

**Last Updated**: 2025
**Version**: 1.0.0
**Author**: Retro Security Terminal Team
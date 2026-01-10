# 🔴 Retro Security Terminal - Browser Extension

A retro-styled browser extension that displays phishing analysis results in a nostalgic terminal interface with red and white aesthetics.

## 🎨 Features

- **Retro Terminal UI**: Old-school CRT console style with scanline effects
- **Auto-Scan**: Automatically scans websites when you visit them
- **Real-time Analysis**: Connects to backend service for phishing detection
- **Risk Assessment**: Clear risk scores and confidence levels
- **User Control**: Always allows users to proceed with informed decisions
- **Responsive Design**: Works on all screen sizes

## 📦 Installation

### Prerequisites

1. Backend service must be running on `http://localhost:4000/endpoints/scan_url`
2. Chrome, Edge, or any Chromium-based browser

### Steps

1. Download or clone this repository
2. Open your browser and navigate to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `retro-security-terminal` folder
6. The extension icon will appear in your toolbar

## 🔧 Backend API Format

The backend service should accept POST requests and return:

```json
{
  "url": "https://example.com",
  "is_phishing": false,
  "risk_score": 15,
  "confidence": "High confidence assessment",
  "explanations": [
    "Domain has valid SSL certificate",
    "No suspicious redirects detected",
    "Domain age exceeds 5 years"
  ]
}
```

### API Endpoint

- **URL**: `http://localhost:4000/endpoints/scan_url`
- **Method**: POST
- **Content-Type**: application/json
- **Body**: `{ "url": "string" }`

## 🎯 Usage

### Automatic Scanning

The extension automatically scans websites when you visit them. A terminal overlay appears with:

1. **Loading screen** with retro ASCII art
2. **Results display** showing:
   - Target URL
   - Verdict (SAFE or PHISHING SUSPECTED)
   - Risk score (0-100)
   - Confidence level
   - Detailed analysis reasons
3. **Action buttons** to proceed or go back

### Manual Scanning

1. Click the extension icon in your toolbar
2. Click "SCAN CURRENT PAGE"
3. View results in the terminal overlay

## 🎨 Design Philosophy

- **Red & White**: High-contrast color scheme for clarity
- **Pixelated Style**: Retro terminal aesthetic
- **No Emojis**: Professional security tone
- **Short Lines**: Easy-to-read format
- **Serious Tone**: Cybersecurity-focused language

## 📁 Project Structure

```
retro-security-terminal/
├── manifest.json           # Extension configuration
├── background.js           # Background service worker
├── content.js              # Content script (main logic)
├── popup.html              # Extension popup interface
├── popup.js                # Popup logic
├── popup.css               # Popup styles
├── terminal/
│   ├── terminal.html       # Terminal overlay HTML (standalone)
│   ├── terminal.js         # Terminal overlay logic (standalone)
│   └── terminal.css        # Terminal overlay styles
├── utils/
│   └── api.js              # API communication helper
├── assets/
│   ├── icon16.png          # Extension icons
│   ├── icon48.png
│   └── icon128.png
├── test-terminal.html      # Standalone test page
└── README.md               # This file
```

## 🔒 Privacy & Security

- No data is collected or stored by the extension
- All analysis is performed by your local backend service
- URLs are only sent to your localhost backend
- No external APIs or third-party services

## 🛠️ Customization

### Modify Colors

Edit `terminal/terminal.css` to change the color scheme:

```css
/* Change primary color from red to blue */
border: 4px solid #0000ff;
color: #0000ff;
```

### Adjust Auto-Scan Behavior

Edit `background.js` to disable auto-scanning:

```javascript
// Comment out the onUpdated listener
// chrome.tabs.onUpdated.addListener(...)
```

### Modify Terminal Messages

Edit `content.js` functions:
- `getLoadingHTML()` - Loading screen
- `getResultHTML()` - Results display
- `getErrorHTML()` - Error messages

## 🐛 Troubleshooting

### Terminal doesn't appear
- Check if backend is running on port 4000
- Open browser console (F12) for error messages
- Verify extension is enabled

### "OFFLINE" status in popup
- Ensure backend service is running
- Check if `localhost:4000` is accessible
- Verify CORS is enabled on backend

### Extension won't load
- Verify all files are in correct locations
- Check `manifest.json` for syntax errors
- Ensure Chrome/Edge version supports Manifest V3

## 📝 Development

### Adding New Features

1. **Storage**: Use `chrome.storage` API for settings
2. **Notifications**: Use `chrome.notifications` API
3. **Context Menus**: Add right-click scan options

### Testing

1. Make changes to files
2. Click "Reload" button in extensions page
3. Refresh any open tabs
4. Test functionality

## 🤝 Contributing

Feel free to submit issues or pull requests for:
- Bug fixes
- UI improvements
- New features
- Documentation updates

## 📄 License

This project is open source and available for modification and distribution.

## 🎓 Credits

Created as a retro-styled security terminal for phishing detection. Inspired by classic terminal interfaces and 80s computer aesthetics.

---

**Note**: This extension is a frontend display tool only. It requires a separate backend service for actual phishing detection logic.
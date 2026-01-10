# Setup Checklist - Retro Security Terminal

Use this checklist to ensure your extension is properly configured.

## 📋 File Structure Verification

Check that all files exist in the correct locations:

```
retro-security-terminal/
│
├── ✅ manifest.json
├── ✅ background.js
├── ✅ content.js
├── ✅ popup.html
├── ✅ popup.js
├── ✅ popup.css
├── ✅ README.md
├── ✅ test-terminal.html
├── ✅ IMPLEMENTATION_GUIDE.md
├── ✅ SETUP_CHECKLIST.md (this file)
│
├── terminal/
│   ├── ✅ terminal.html
│   ├── ✅ terminal.js
│   └── ✅ terminal.css
│
├── utils/
│   └── ✅ api.js
│
└── assets/
    ├── ⚠️ icon16.png   (you need to create)
    ├── ⚠️ icon48.png   (you need to create)
    └── ⚠️ icon128.png  (you need to create)
```

## 🎨 Create Extension Icons

You need to create three icon images. Here are the specifications:

### Icon Requirements

**icon16.png**
- Size: 16x16 pixels
- Format: PNG with transparency
- Design: Small terminal icon or shield symbol
- Use: Browser toolbar

**icon48.png**
- Size: 48x48 pixels
- Format: PNG with transparency
- Design: Detailed terminal/shield design
- Use: Extension management page

**icon128.png**
- Size: 128x128 pixels
- Format: PNG with transparency
- Design: High-res terminal/shield design
- Use: Chrome Web Store (if published)

### Quick Icon Creation Options

**Option 1: Online Icon Generator**
- Use sites like favicon.io or flaticon.com
- Search for "terminal" or "shield" icons
- Resize to required dimensions

**Option 2: Simple Placeholder**
Create simple colored squares with text:
- Red background (#ff0000)
- White text ("16", "48", "128")
- Save as PNG

**Option 3: Design Tool**
- Use Figma, Photoshop, or GIMP
- Create retro terminal/shield design
- Export at each required size

## 🔧 Backend Setup

Verify your backend is ready:

### Backend Checklist

- [ ] Backend service is running
- [ ] Listening on `http://localhost:4000`
- [ ] Endpoint `/endpoints/scan_url` exists
- [ ] Accepts POST requests
- [ ] Accepts JSON body: `{"url": "string"}`
- [ ] Returns JSON with required fields
- [ ] CORS enabled for localhost

### Test Backend Manually

**Using curl:**
```bash
curl -X POST http://localhost:4000/endpoints/scan-url \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}'
```

**Expected Response:**
```json
{
  "url": "https://google.com",
  "is_phishing": false,
  "risk_score": 5,
  "confidence": "High confidence",
  "explanations": ["Valid SSL", "Domain age > 10 years"]
}
```

### Backend Response Validation

Your backend MUST return:
- ✅ `url` (string)
- ✅ `is_phishing` (boolean)
- ✅ `risk_score` (number, 0-100)
- ✅ `confidence` (string)
- ✅ `explanations` (array of strings)

## 🚀 Extension Installation

### Step 1: Pre-Installation Check

- [ ] All code files created
- [ ] Icons created in `assets/` folder
- [ ] Backend running and tested
- [ ] Chrome/Edge browser installed

### Step 2: Load Extension

1. Open Chrome/Edge
2. Navigate to: `chrome://extensions/` or `edge://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Select your `retro-security-terminal` folder
6. Extension should appear in the list

### Step 3: Verify Installation

- [ ] Extension appears in list with no errors
- [ ] Icon appears in browser toolbar
- [ ] Click icon → popup opens
- [ ] Popup shows "SYSTEM STATUS"
- [ ] No console errors (right-click extension → Inspect popup)

## 🧪 Testing Sequence

Follow this testing sequence to verify everything works:

### Test 1: Standalone Terminal

1. Open `test-terminal.html` in browser
2. Click "Show Loading Screen"
   - [ ] Terminal overlay appears
   - [ ] ASCII art displays correctly
   - [ ] Red border visible
   - [ ] Close button works
3. Click "Show Safe Result"
   - [ ] Verdict shows "SITE APPEARS SAFE"
   - [ ] Risk score displays
   - [ ] White verdict box
   - [ ] Cache note appears
   - [ ] Continue button works
4. Click "Show Phishing Alert"
   - [ ] Verdict shows "PHISHING SUSPECTED"
   - [ ] Red pulsing verdict box
   - [ ] High risk score (red)
   - [ ] Both buttons appear
   - [ ] Explanations display

### Test 2: Extension Popup

1. Click extension icon in toolbar
2. Check popup:
   - [ ] Header displays correctly
   - [ ] Status indicator shows
   - [ ] If backend running: shows "ONLINE" (green dot)
   - [ ] If backend stopped: shows "OFFLINE" (gray dot)
   - [ ] "Scan Current Page" button works
   - [ ] "Settings" button shows alert

### Test 3: Auto-Scan (Backend Running)

1. Ensure backend is running
2. Visit any website (e.g., `https://google.com`)
3. Watch for terminal:
   - [ ] Terminal appears automatically
   - [ ] Shows loading animation first
   - [ ] Then displays results
   - [ ] Results match backend response
   - [ ] Buttons are interactive

### Test 4: Manual Scan

1. Visit any website
2. Click extension icon
3. Click "Scan Current Page"
   - [ ] Popup closes
   - [ ] Terminal appears on page
   - [ ] Scan proceeds normally

### Test 5: Error Handling (Backend Stopped)

1. Stop your backend service
2. Visit any website
3. Check terminal:
   - [ ] Terminal appears
   - [ ] Shows loading first
   - [ ] Then displays error
   - [ ] Error message clear
   - [ ] Suggests checking localhost:4000
   - [ ] Close button works

### Test 6: Different Risk Levels

Test the backend with these scenarios:

**Low Risk (0-39):**
- [ ] White/gray risk indicator
- [ ] "LOW RISK" label
- [ ] Continue button only

**Medium Risk (40-69):**
- [ ] Orange risk indicator
- [ ] "MEDIUM RISK" label
- [ ] Continue button only

**High Risk (70-100):**
- [ ] Red risk indicator
- [ ] "HIGH RISK" label
- [ ] Both buttons (Go Back + Proceed Anyway)

## 🎯 Common Issues & Solutions

### Issue: Extension Won't Load

**Symptoms**: Error when clicking "Load unpacked"

**Solutions**:
- Check `manifest.json` for JSON syntax errors
- Verify all file paths in manifest are correct
- Ensure no special characters in folder name
- Check file permissions

### Issue: Icons Not Showing

**Symptoms**: Generic puzzle piece icon appears

**Solutions**:
- Verify icon files exist in `assets/` folder
- Check file names match exactly: `icon16.png`, `icon48.png`, `icon128.png`
- Ensure icons are PNG format
- Reload extension after adding icons

### Issue: Terminal Doesn't Appear

**Symptoms**: No overlay when visiting pages

**Solutions**:
- Refresh page after loading extension
- Check browser console (F12) for errors
- Verify `content.js` is listed in manifest
- Check if site is HTTP/HTTPS (not chrome:// or file://)
- Look for extension errors in `chrome://extensions/`

### Issue: API Calls Failing

**Symptoms**: Always shows error or timeout

**Solutions**:
- Verify backend running: `curl localhost:4000`
- Check backend URL in `utils/api.js`
- Look at Network tab (F12) for actual error
- Verify CORS headers on backend
- Check backend logs for errors

### Issue: Styling Broken

**Symptoms**: Terminal looks unstyled or wrong

**Solutions**:
- Verify `terminal.css` path in manifest
- Check for CSS conflicts (try on different sites)
- Clear browser cache
- Check for CSS syntax errors

### Issue: Popup Status Always "OFFLINE"

**Symptoms**: Even when backend running

**Solutions**:
- Test backend: `curl -X POST localhost:4000/endpoints/scan_url -d '{"url":"test"}'`
- Check popup console: Right-click extension → Inspect popup
- Verify backend accepts OPTIONS requests (CORS)
- Try different test URL in `popup.js`

## ✅ Final Verification

Before considering setup complete, verify ALL of these:

### Extension Loading
- [x] Extension loads without errors
- [x] No red errors in `chrome://extensions/`
- [x] Extension can be enabled/disabled
- [x] Icons display correctly

### Visual Display
- [x] Terminal has red border
- [x] Retro font displays (Courier New)
- [x] Scanline effect visible
- [x] Colors match specifications
- [x] Animations work smoothly

### Functionality
- [x] Auto-scan triggers on page load
- [x] Manual scan works from popup
- [x] Backend communication successful
- [x] Results display correctly
- [x] Error handling works
- [x] All buttons functional

### User Experience
- [x] Terminal appears within 1 second
- [x] Loading animation shows first
- [x] Results are readable
- [x] Buttons clearly labeled
- [x] Close button always works
- [x] No page functionality blocked

### Backend Integration
- [x] Backend receives requests
- [x] Backend returns valid JSON
- [x] All response fields present
- [x] Error responses handled gracefully
- [x] Timeout works properly

## 📝 Setup Complete!

Once all checkboxes are marked, your extension is ready for use!

### Next Steps

1. **Daily Use**: Let extension run automatically
2. **Monitor**: Check for any errors or issues
3. **Feedback**: Note any improvements needed
4. **Customize**: Adjust settings to your preference

### Optional Enhancements

Consider adding:
- [ ] Whitelist for trusted domains
- [ ] Settings page for configuration
- [ ] Result caching in extension storage
- [ ] Keyboard shortcuts
- [ ] Statistics/history tracking
- [ ] Export results feature

---

**Need Help?**
- Check `IMPLEMENTATION_GUIDE.md` for detailed info
- Review `README.md` for usage instructions
- Test with `test-terminal.html` first
- Check browser console for errors (F12)
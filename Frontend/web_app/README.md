<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Red Tape - Setup Guide</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #ffffff;
            color: #000000;
            line-height: 1.6;
        }
        h1 {
            border-bottom: 4px solid #dc2626;
            padding-bottom: 10px;
            font-size: 2.5em;
            letter-spacing: 2px;
        }
        h2 {
            color: #dc2626;
            margin-top: 40px;
            font-size: 1.8em;
            border-left: 8px solid #dc2626;
            padding-left: 15px;
        }
        h3 {
            margin-top: 25px;
            font-size: 1.3em;
            font-weight: bold;
        }
        code {
            background: #f5f5f5;
            padding: 2px 8px;
            border: 2px solid #000000;
            font-family: 'Courier New', monospace;
        }
        pre {
            background: #000000;
            color: #ffffff;
            padding: 20px;
            border: 4px solid #000000;
            overflow-x: auto;
            box-shadow: 8px 8px 0px 0px rgba(220, 38, 38, 1);
        }
        pre code {
            background: transparent;
            border: none;
            color: #ffffff;
        }
        .file-tree {
            background: #f5f5f5;
            padding: 20px;
            border: 3px solid #000000;
            font-family: 'Courier New', monospace;
            white-space: pre;
            margin: 20px 0;
        }
        .section {
            margin: 30px 0;
            padding: 20px;
            border: 3px solid #000000;
            background: #ffffff;
        }
        .highlight {
            background: #dc2626;
            color: #ffffff;
            padding: 2px 8px;
            font-weight: bold;
        }
        .note {
            background: #fff5f5;
            border-left: 6px solid #dc2626;
            padding: 15px;
            margin: 20px 0;
        }
        ul {
            list-style: none;
            padding-left: 0;
        }
        ul li:before {
            content: "▸ ";
            color: #dc2626;
            font-weight: bold;
            margin-right: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border: 3px solid #000000;
        }
        th, td {
            border: 2px solid #000000;
            padding: 12px;
            text-align: left;
        }
        th {
            background: #000000;
            color: #ffffff;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background: #f5f5f5;
        }
        .status-complete {
            color: #16a34a;
            font-weight: bold;
        }
        .status-pending {
            color: #dc2626;
            font-weight: bold;
        }
        .command {
            background: #000000;
            color: #00ff00;
            padding: 3px 8px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <h1>RED TAPE - PHISHING DETECTION SYSTEM</h1>
    <p>A vintage-styled phishing detection web application with a typewriter aesthetic and brutal design system.</p>

    <div class="section">
        <h2>📁 PROJECT STRUCTURE</h2>
        <div class="file-tree">red-tape-phishing-detection/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   ├── Sidebar.js
│   │   │   └── Footer.js
│   │   ├── common/
│   │   │   ├── Button.js
│   │   │   ├── Card.js
│   │   │   └── VintageTexture.js
│   │   └── analysis/
│   │       ├── UrlInput.js
│   │       ├── ResultsDisplay.js
│   │       ├── DetailedReport.js
│   │       └── AiExplanation.js
│   ├── pages/
│   │   ├── LandingPage.js
│   │   ├── AnalysisPage.js
│   │   ├── FeaturesPage.js
│   │   ├── AboutPage.js <span class="status-pending">(TO BE CREATED)</span>
│   │   └── featureDetails/
│   │       ├── UrlDetectionDetail.js
│   │       ├── CertificateDetail.js <span class="status-pending">(TO BE CREATED)</span>
│   │       ├── LogoDetectionDetail.js <span class="status-pending">(TO BE CREATED)</span>
│   │       ├── ContentAnalysisDetail.js <span class="status-pending">(TO BE CREATED)</span>
│   │       ├── BehaviorAnalysisDetail.js <span class="status-pending">(TO BE CREATED)</span>
│   │       └── HybridScoringDetail.js <span class="status-pending">(TO BE CREATED)</span>
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md</div>
    </div>

    <div class="section">
        <h2>🚀 INSTALLATION STEPS</h2>
        
        <h3>Step 1: Create React App</h3>
        <pre><code>npx create-react-app red-tape-phishing-detection
cd red-tape-phishing-detection</code></pre>

        <h3>Step 2: Install Dependencies</h3>
        <pre><code>npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>

        <h3>Step 3: Create Directory Structure</h3>
        <pre><code>mkdir -p src/components/layout
mkdir -p src/components/common
mkdir -p src/components/analysis
mkdir -p src/pages/featureDetails</code></pre>

        <h3>Step 4: Replace Files</h3>
        <ul>
            <li>Replace the generated files with the provided component files</li>
            <li>Copy all components to their respective directories</li>
            <li>Replace <code>App.js</code>, <code>index.js</code>, <code>index.css</code></li>
            <li>Replace <code>package.json</code> and <code>tailwind.config.js</code></li>
        </ul>

        <h3>Step 5: Run the Application</h3>
        <pre><code>npm start</code></pre>
        <p>The application will open at <code>http://localhost:3000</code></p>
    </div>

    <div class="section">
        <h2>📋 FILE PLACEMENT GUIDE</h2>
        
        <h3>Root Directory Files</h3>
        <table>
            <tr>
                <th>File</th>
                <th>Location</th>
                <th>Purpose</th>
            </tr>
            <tr>
                <td><code>package.json</code></td>
                <td>Root directory</td>
                <td>Dependencies and scripts configuration</td>
            </tr>
            <tr>
                <td><code>tailwind.config.js</code></td>
                <td>Root directory</td>
                <td>Tailwind CSS configuration</td>
            </tr>
            <tr>
                <td><code>README.md</code></td>
                <td>Root directory</td>
                <td>Setup and documentation</td>
            </tr>
        </table>

        <h3>Main Application Files (src/)</h3>
        <table>
            <tr>
                <th>File</th>
                <th>Location</th>
                <th>Purpose</th>
            </tr>
            <tr>
                <td><code>index.js</code></td>
                <td>src/</td>
                <td>React entry point</td>
            </tr>
            <tr>
                <td><code>index.css</code></td>
                <td>src/</td>
                <td>Global styles and Tailwind imports</td>
            </tr>
            <tr>
                <td><code>App.js</code></td>
                <td>src/</td>
                <td>Main routing configuration</td>
            </tr>
        </table>

        <h3>Layout Components (src/components/layout/)</h3>
        <table>
            <tr>
                <th>File</th>
                <th>Purpose</th>
            </tr>
            <tr>
                <td><code>Header.js</code></td>
                <td>Navigation header with logo and menu button</td>
            </tr>
            <tr>
                <td><code>Sidebar.js</code></td>
                <td>Sliding sidebar navigation menu</td>
            </tr>
            <tr>
                <td><code>Footer.js</code></td>
                <td>Footer component with tagline</td>
            </tr>
        </table>

        <h3>Common Components (src/components/common/)</h3>
        <table>
            <tr>
                <th>File</th>
                <th>Purpose</th>
            </tr>
            <tr>
                <td><code>VintageTexture.js</code></td>
                <td>Background texture overlay effect</td>
            </tr>
            <tr>
                <td><code>Button.js</code></td>
                <td>Reusable button with multiple variants</td>
            </tr>
            <tr>
                <td><code>Card.js</code></td>
                <td>Reusable card component with brutal styling</td>
            </tr>
        </table>

        <h3>Analysis Components (src/components/analysis/)</h3>
        <table>
            <tr>
                <th>File</th>
                <th>Purpose</th>
            </tr>
            <tr>
                <td><code>UrlInput.js</code></td>
                <td>URL input field and analyze button</td>
            </tr>
            <tr>
                <td><code>ResultsDisplay.js</code></td>
                <td>Scan results with confidence display</td>
            </tr>
            <tr>
                <td><code>DetailedReport.js</code></td>
                <td>Detailed analysis report with all modules</td>
            </tr>
            <tr>
                <td><code>AiExplanation.js</code></td>
                <td>AI-generated explanation section</td>
            </tr>
        </table>

        <h3>Main Pages (src/pages/)</h3>
        <table>
            <tr>
                <th>File</th>
                <th>Route</th>
                <th>Purpose</th>
            </tr>
            <tr>
                <td><code>LandingPage.js</code></td>
                <td>/</td>
                <td>Home/welcome page with CTAs</td>
            </tr>
            <tr>
                <td><code>AnalysisPage.js</code></td>
                <td>/analyze</td>
                <td>URL analysis and results page</td>
            </tr>
            <tr>
                <td><code>FeaturesPage.js</code></td>
                <td>/features</td>
                <td>Features grid overview page</td>
            </tr>
            <tr>
                <td><code>AboutPage.js</code></td>
                <td>/about</td>
                <td><span class="status-pending">TO BE CREATED</span></td>
            </tr>
        </table>

        <h3>Feature Detail Pages (src/pages/featureDetails/)</h3>
        <table>
            <tr>
                <th>File</th>
                <th>Route</th>
                <th>Status</th>
            </tr>
            <tr>
                <td><code>UrlDetectionDetail.js</code></td>
                <td>/features/url-detection</td>
                <td><span class="status-complete">✓ COMPLETE</span></td>
            </tr>
            <tr>
                <td><code>CertificateDetail.js</code></td>
                <td>/features/certificate</td>
                <td><span class="status-pending">✗ TO BE CREATED</span></td>
            </tr>
            <tr>
                <td><code>LogoDetectionDetail.js</code></td>
                <td>/features/logo-detection</td>
                <td><span class="status-pending">✗ TO BE CREATED</span></td>
            </tr>
            <tr>
                <td><code>ContentAnalysisDetail.js</code></td>
                <td>/features/content-analysis</td>
                <td><span class="status-pending">✗ TO BE CREATED</span></td>
            </tr>
            <tr>
                <td><code>BehaviorAnalysisDetail.js</code></td>
                <td>/features/behavior-analysis</td>
                <td><span class="status-pending">✗ TO BE CREATED</span></td>
            </tr>
            <tr>
                <td><code>HybridScoringDetail.js</code></td>
                <td>/features/hybrid-scoring</td>
                <td><span class="status-pending">✗ TO BE CREATED</span></td>
            </tr>
        </table>
    </div>

    <div class="section">
        <h2>🎨 DESIGN SYSTEM</h2>
        
        <h3>Color Palette</h3>
        <ul>
            <li><strong>Primary:</strong> White (#FFFFFF) - Main background</li>
            <li><strong>Secondary:</strong> Black (#000000) - Text and borders</li>
            <li><strong>Accent:</strong> Red (#dc2626) - Highlights and CTAs</li>
        </ul>

        <h3>Typography</h3>
        <ul>
            <li><strong>Primary Font:</strong> Courier Prime (typewriter style)</li>
            <li><strong>Alternative Font:</strong> Special Elite (vintage typewriter)</li>
            <li><strong>Monospace:</strong> Courier New (fallback)</li>
        </ul>

        <h3>Visual Effects</h3>
        <ul>
            <li><strong>Borders:</strong> 4px solid black borders</li>
            <li><strong>Shadows:</strong> Brutal box shadows (8px offset, no blur)</li>
            <li><strong>Hover Effects:</strong> Shadow expansion, icon rotation, color changes</li>
            <li><strong>Animations:</strong> Fade-in, slide-up, typewriter effects</li>
        </ul>
    </div>

    <div class="section">
        <h2>✅ FEATURES STATUS</h2>
        
        <h3>Completed Features</h3>
        <ul>
            <li>Landing Page with installation options</li>
            <li>Analysis Page with URL input and results display</li>
            <li>Features Page with grid layout</li>
            <li>URL Detection detail page (template for others)</li>
            <li>Reusable component library (Header, Sidebar, Footer, Button, Card)</li>
            <li>Vintage typewriter aesthetic with brutal design</li>
            <li>Responsive layout for all screen sizes</li>
            <li>Smooth animations and transitions</li>
            <li>React Router navigation</li>
            <li>Tailwind CSS styling system</li>
        </ul>

        <h3>Pending Development</h3>
        <ul>
            <li>About Page</li>
            <li>5 remaining feature detail pages:
                <ul style="margin-left: 30px;">
                    <li>Certificate Analysis Detail</li>
                    <li>Logo Detection Detail</li>
                    <li>Content Analysis Detail</li>
                    <li>Behavior Analysis Detail</li>
                    <li>Hybrid Scoring Detail</li>
                </ul>
            </li>
        </ul>
    </div>

    <div class="section">
        <h2>🔌 BACKEND INTEGRATION POINTS</h2>
        
        <p>Replace mock data in <code>AnalysisPage.js</code> with actual API calls:</p>
        
        <h3>Functions to Update:</h3>
        <ul>
            <li><strong>handleAnalyze():</strong> Connect to phishing detection API endpoint</li>
            <li><strong>handleAiExplain():</strong> Connect to AI explanation API endpoint</li>
            <li><strong>mockResults:</strong> Replace with real API response structure</li>
        </ul>

        <div class="note">
            <strong>Note:</strong> The current implementation uses mock data for demonstration. Update these sections with your actual backend API endpoints and response handling logic.
        </div>
    </div>

    <div class="section">
        <h2>📝 NEXT STEPS</h2>
        
        <ol style="list-style: decimal; padding-left: 40px;">
            <li>Create the remaining 5 feature detail pages using <code>UrlDetectionDetail.js</code> as a template</li>
            <li>Create the About Page with project information</li>
            <li>Add actual images and icons where placeholders exist</li>
            <li>Connect backend APIs for phishing detection</li>
            <li>Add comprehensive loading states and error handling</li>
            <li>Implement browser plugin and Red Box download functionality</li>
            <li>Add user authentication if required</li>
            <li>Set up database for storing scan results (optional)</li>
            <li>Deploy to production environment</li>
        </ol>
    </div>

    <div class="section">
        <h2>💡 DEVELOPMENT NOTES</h2>
        
        <ul>
            <li>All navigation links are configured with React Router</li>
            <li>Mock data is used throughout for demonstration purposes</li>
            <li>Sidebar navigation works consistently across all pages</li>
            <li>Responsive design optimized for mobile, tablet, and desktop</li>
            <li>Tailwind CSS provides utility-first styling</li>
            <li>Lucide React provides consistent icon system</li>
            <li>Component-based architecture for easy maintenance</li>
            <li>Custom animations defined in <code>index.css</code></li>
        </ul>
    </div>

    <div class="note">
        <strong>🚨 Important:</strong> Remember to uncomment the routes in <code>App.js</code> as you create the remaining feature detail pages and the About page.
    </div>

    <footer style="text-align: center; margin-top: 60px; padding: 20px; border-top: 4px solid #dc2626;">
        <p style="font-size: 0.9em; letter-spacing: 2px;">[ RED TAPE - PROTECTING YOUR DIGITAL PRESENCE ]</p>
        <p style="font-size: 0.8em; margin-top: 10px;">Built with React, Tailwind CSS, and Lucide React</p>
    </footer>
</body>
</html>
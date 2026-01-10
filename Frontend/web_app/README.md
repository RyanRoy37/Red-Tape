<h1 align="center">RED TAPE – PHISHING DETECTION SYSTEM</h1>
<p align="center">A vintage-styled phishing detection web application with a brutalist + typewriter aesthetic.</p>

<h2>📁 Project Structure</h2>
<pre>
red-tape-phishing-detection/
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
│   │   ├── AboutPage.js (TO BE CREATED)
│   │   └── featureDetails/
│   │       ├── UrlDetectionDetail.js
│   │       ├── CertificateDetail.js (TO BE CREATED)
│   │       ├── LogoDetectionDetail.js (TO BE CREATED)
│   │       ├── ContentAnalysisDetail.js (TO BE CREATED)
│   │       ├── BehaviorAnalysisDetail.js (TO BE CREATED)
│   │       └── HybridScoringDetail.js (TO BE CREATED)
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
</pre>

<h2>🚀 Installation Steps</h2>

<h3>Step 1: Create React App</h3>
<pre>
npx create-react-app red-tape-phishing-detection
cd red-tape-phishing-detection
</pre>

<h3>Step 2: Install Dependencies</h3>
<pre>
npm install react-router-dom lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
</pre>

<h3>Step 3: Create Directory Structure</h3>
<pre>
mkdir -p src/components/layout
mkdir -p src/components/common
mkdir -p src/components/analysis
mkdir -p src/pages/featureDetails
</pre>

<h3>Step 4: Replace Files</h3>
<ul>
    <li>Replace generated files with your provided components</li>
    <li>Copy all components to their directories</li>
    <li>Replace <code>App.js</code>, <code>index.js</code>, <code>index.css</code></li>
    <li>Replace <code>package.json</code> and <code>tailwind.config.js</code></li>
</ul>

<h3>Step 5: Run the Application</h3>
<pre>npm start</pre>
<p>The application will open at <code>http://localhost:3000</code></p>

<h2>📋 File Placement Guide</h2>

<h3>Root Files</h3>
<table>
<tr><th>File</th><th>Location</th><th>Purpose</th></tr>
<tr><td>package.json</td><td>Root</td><td>Dependencies & scripts</td></tr>
<tr><td>tailwind.config.js</td><td>Root</td><td>Tailwind CSS config</td></tr>
<tr><td>README.md</td><td>Root</td><td>Project documentation</td></tr>
</table>

<h3>Main App Files (src/)</h3>
<table>
<tr><th>File</th><th>Purpose</th></tr>
<tr><td>index.js</td><td>React entry point</td></tr>
<tr><td>index.css</td><td>Global styles</td></tr>
<tr><td>App.js</td><td>Main routing</td></tr>
</table>

<h3>Layout Components</h3>
<table>
<tr><th>File</th><th>Purpose</th></tr>
<tr><td>Header.js</td><td>Navigation header</td></tr>
<tr><td>Sidebar.js</td><td>Slide-in menu</td></tr>
<tr><td>Footer.js</td><td>Footer section</td></tr>
</table>

<h3>Common Components</h3>
<table>
<tr><th>File</th><th>Purpose</th></tr>
<tr><td>Button.js</td><td>Reusable button</td></tr>
<tr><td>Card.js</td><td>Brutalist card</td></tr>
<tr><td>VintageTexture.js</td><td>Background texture</td></tr>
</table>

<h3>Analysis Components</h3>
<table>
<tr><th>File</th><th>Purpose</th></tr>
<tr><td>UrlInput.js</td><td>URL input field</td></tr>
<tr><td>ResultsDisplay.js</td><td>Scan result summary</td></tr>
<tr><td>DetailedReport.js</td><td>Full analysis report</td></tr>
<tr><td>AiExplanation.js</td><td>LLM explanation output</td></tr>
</table>

<h3>Pages</h3>
<table>
<tr><th>File</th><th>Route</th><th>Status</th></tr>
<tr><td>LandingPage.js</td><td>/</td><td>Complete</td></tr>
<tr><td>AnalysisPage.js</td><td>/analyze</td><td>Complete</td></tr>
<tr><td>FeaturesPage.js</td><td>/features</td><td>Complete</td></tr>
<tr><td>AboutPage.js</td><td>/about</td><td>Pending</td></tr>
</table>

<h3>Feature Detail Pages</h3>
<table>
<tr><th>Page</th><th>Route</th><th>Status</th></tr>
<tr><td>UrlDetectionDetail.js</td><td>/features/url-detection</td><td>Complete</td></tr>
<tr><td>CertificateDetail.js</td><td>/features/certificate</td><td>Pending</td></tr>
<tr><td>LogoDetectionDetail.js</td><td>/features/logo-detection</td><td>Pending</td></tr>
<tr><td>ContentAnalysisDetail.js</td><td>/features/content-analysis</td><td>Pending</td></tr>
<tr><td>BehaviorAnalysisDetail.js</td><td>/features/behavior-analysis</td><td>Pending</td></tr>
<tr><td>HybridScoringDetail.js</td><td>/features/hybrid-scoring</td><td>Pending</td></tr>
</table>

<h2>🎨 Design System</h2>

<h3>Colors</h3>
<ul>
    <li><strong>Primary:</strong> White (#fff)</li>
    <li><strong>Secondary:</strong> Black (#000)</li>
    <li><strong>Accent:</strong> Red (#dc2626)</li>
</ul>

<h3>Typography</h3>
<ul>
    <li>Courier Prime (primary)</li>
    <li>Special Elite (alt)</li>
    <li>Courier New (fallback)</li>
</ul>

<h3>Effects</h3>
<ul>
    <li>4px borders</li>
    <li>Brutalist shadows (8px offset)</li>
    <li>Hover animations</li>
    <li>Typewriter animations</li>
</ul>

<h2>📝 Next Steps</h2>
<ol>
    <li>Create remaining feature detail pages</li>
    <li>Create About Page</li>
    <li>Add real icons/images</li>
    <li>Connect backend API</li>
    <li>Add loading + error handling</li>
    <li>Browser plugin & Red Box installer</li>
    <li>User authentication (optional)</li>
    <li>Store scan results (optional DB)</li>
    <li>Deploy to production</li>
</ol>

<h2>💡 Development Notes</h2>
<ul>
    <li>Mock data currently used</li>
    <li>Responsive layouts done</li>
    <li>Sidebar & navigation consistent</li>
    <li>Custom animations in <code>index.css</code></li>
    <li>Lucide icons + Tailwind utilities</li>
</ul>

<p><strong>Important:</strong> Enable routes in <code>App.js</code> as new pages are created.</p>

<hr>
<p align="center">[ RED TAPE — PROTECTING YOUR DIGITAL PRESENCE ]</p>
<p align="center">Built with React, Tailwind, and Lucide React</p>

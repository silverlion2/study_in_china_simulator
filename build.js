const fs = require('fs');
const path = require('path');

const dir = __dirname;

function readAndStrip(filePath) {
    let content = fs.readFileSync(path.join(dir, filePath), 'utf8');
    // Remove imports
    content = content.replace(/^import\s+.*?(?:from\s+['"].*?['"]|['"].*?['"]);?$/gm, '');
    // Remove "use client"
    content = content.replace(/"use client";/g, '');
    // Change exports to var/const
    content = content.replace(/export\s+const\s+(\w+)/g, 'const $1');
    content = content.replace(/export\s+class\s+(\w+)/g, 'class $1');
    content = content.replace(/export\s+default\s+function\s+(\w+)/g, 'function $1');
    // Fix image paths
    content = content.replace(/'\/images\/simulator\//g, "'./images/simulator/");
    content = content.replace(/"\/images\/simulator\//g, '"./images/simulator/');
    return content;
}

const templates = [
    'engine/GameState.js',
    'engine/EventSystem.js',
    'engine/AudioManager.js',
    'data/audioManifest.js',
    'data/epoch1.js',
    'data/epoch2.js',
    'data/epoch3.js',
    'data/hubData.js',
    'components/Dashboard.jsx',
    'components/TabletInterface.jsx',
    'components/StoryPanel.jsx',
    'components/MiniGames.jsx',
    'page.js'
];

let jsContent = '';
templates.forEach(f => {
    jsContent += `\n/* --- ${f} --- */\n`;
    jsContent += readAndStrip(f);
});

// For page.js, rename SimulatorPage to App if it isn't already, or just render it.
// Wait, the main component is SimulatorPage. We'll render SimulatorPage.

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sim Panda - Study in China Simulator</title>
  <!-- React & ReactDOM -->
  <script src="./lib/react.production.min.js"><\/script>
  <script src="./lib/react-dom.production.min.js"><\/script>
  <!-- Babel for JSX -->
  <script src="./lib/babel.min.js"><\/script>
  <!-- Tailwind CSS -->
  <script src="./lib/tailwindcss.js"><\/script>
  <style>
    /* Prevent scroll bouncing and fill window exactly */
    html, body, #root { height: 100%; margin: 0; padding: 0; }
    body { overflow: hidden; background: #0f172a; color: white; font-family: sans-serif; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect, useRef } = React;

    ${jsContent}

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<SimulatorPage />);
  <\/script>
</body>
</html>`;

fs.writeFileSync(path.join(dir, 'index.html'), htmlTemplate);
console.log('Successfully generated index.html!');

// Auto-copy to PandaOffer website folder on the Windows dev machine.
// On other platforms, set PANDAOFFER_SIMULATOR_DIR explicitly to opt in.
const targetDir = process.env.PANDAOFFER_SIMULATOR_DIR || (process.platform === 'win32' ? 'c:\\Users\\T480S\\pandaoffer\\public\\tools\\simulator' : '');
if (targetDir) {
    try {
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        fs.cpSync(path.join(dir, 'index.html'), path.join(targetDir, 'index.html'));
        fs.cpSync(path.join(dir, 'lib'), path.join(targetDir, 'lib'), { recursive: true, force: true });
        fs.cpSync(path.join(dir, 'images'), path.join(targetDir, 'images'), { recursive: true, force: true });
        fs.cpSync(path.join(dir, 'assets'), path.join(targetDir, 'assets'), { recursive: true, force: true });
        console.log('Successfully pushed build to PandaOffer website!');
    } catch (err) {
        console.error('Failed to copy to PandaOffer website:', err);
    }
} else {
    console.log('Skipped PandaOffer website copy; set PANDAOFFER_SIMULATOR_DIR to enable it.');
}

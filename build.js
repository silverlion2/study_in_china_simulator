const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\T480S\\Desktop\\study_in_china_simulator';

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
    'data/epoch1.js',
    'data/epoch2.js',
    'data/epoch3.js',
    'data/hubData.js',
    'components/Dashboard.jsx',
    'components/TabletInterface.jsx',
    'components/StoryPanel.jsx',
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
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
  <!-- Babel for JSX -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    /* Prevent scroll bouncing */
    body { margin: 0; padding: 0; overflow: hidden; background: #0f172a; color: white; font-family: sans-serif; }
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

const fs = require('fs');
const path = require('path');

// Regex patterns to pull exported objects
const dataDir = path.join(__dirname, 'data');
const files = ['epoch1.js', 'epoch2.js', 'epoch3.js', 'hubData.js'];

let allNodes = {};

// We will do a naive text parsing since these use ES modules
for (const file of files) {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  // Hacky way to evaluate the object structure without ES imports
  // Just strip the export const ... = and parse
  let objText = content.replace(/export\s+const\s+\w+\s*=\s*/g, '');
  objText = objText.replace(/export\s+default\s+\w+;/g, '');
  // Since the keys might just be plain JS, we can't easily parse JSON.
  // Instead, let's use a temporary file to require it as commonJS.
}

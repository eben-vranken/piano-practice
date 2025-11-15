// Simple script to generate PWA icons
// Run with: node generate-icons.js
// Requires: npm install canvas (or use online tool to convert SVG to PNG)

const fs = require('fs');
const path = require('path');

// Create a simple SVG icon that can be converted to PNG
const createSVGIcon = (size) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#000000"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">🎹</text>
</svg>`;
};

// Create SVG files
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create SVG icons
fs.writeFileSync(path.join(publicDir, 'icon-192.svg'), createSVGIcon(192));
fs.writeFileSync(path.join(publicDir, 'icon-512.svg'), createSVGIcon(512));

console.log('SVG icons created!');
console.log('Note: For PWA to work properly, you need PNG files.');
console.log('You can:');
console.log('1. Use an online SVG to PNG converter (e.g., cloudconvert.com)');
console.log('2. Install canvas: npm install canvas, then run this script with canvas support');
console.log('3. Use ImageMagick: convert icon-192.svg icon-192.png');


const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Run TypeScript compilation
console.log('Compiling TypeScript...');
execSync('npx tsc', { stdio: 'inherit' });

// Copy package.json to dist
console.log('Copying package.json to dist...');
fs.copyFileSync('package.json', 'dist/package.json');

console.log('Build completed successfully!'); 
#!/usr/bin/env node
/* eslint-disable no-undef */

/**
 * Post-install script to create a stub for react-native-worklets/plugin
 * This prevents "Cannot find module" errors when dependencies reference worklets
 */

const fs = require('fs');
const path = require('path');

const workletStubDir = path.join(__dirname, '..', 'node_modules', 'react-native-worklets');
const pluginFile = path.join(workletStubDir, 'plugin.js');
const packageFile = path.join(workletStubDir, 'package.json');

// Create directory if it doesn't exist
if (!fs.existsSync(workletStubDir)) {
  fs.mkdirSync(workletStubDir, { recursive: true });
}

// Create stub plugin.js
const pluginStub = `// Stub plugin for react-native-worklets to avoid Babel errors
// This is a no-op plugin that prevents "Cannot find module" errors

module.exports = function() {
  return {
    name: "react-native-worklets-stub",
    visitor: {
      // No transformations - this is just a stub to prevent babel errors
    }
  };
};`;

// Create stub package.json
const packageStub = `{
  "name": "react-native-worklets",
  "version": "0.0.0-stub",
  "description": "Stub package to prevent babel plugin errors",
  "main": "plugin.js"
}`;

// Write files
fs.writeFileSync(pluginFile, pluginStub);
fs.writeFileSync(packageFile, packageStub);

console.log('✅ Created react-native-worklets stub to prevent Babel errors');

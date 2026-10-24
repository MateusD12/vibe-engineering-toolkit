#!/usr/bin/env node
const path = require('path');
const target = process.argv[2] || process.cwd();
const generator = path.join(__dirname, '..', 'skills', 'obsidian-engine', 'scripts', 'codemap_generator.js');

try {
  require(generator);
} catch (err) {
  console.error('Erro ao executar codemap_generator:', err);
  process.exit(1);
}

const fs = require('fs');
const { join } = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
const lines = file.split('\n');

const 
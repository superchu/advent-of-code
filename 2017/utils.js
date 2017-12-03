const fs = require('fs');

const getInput = input => {
  return fs.readFileSync(input, 'utf8');
};

const assert = (input, output) => {
  const matches = input === output;
  console.log(`${input} === ${output}:`, matches ? '\x1b[32m' : '\x1b[31m', matches ? 'true' : `false (${input})`, '\x1b[0m');
};
module.exports = { getInput, assert };

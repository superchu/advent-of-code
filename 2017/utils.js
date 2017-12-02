const fs = require('fs');

const getInput = input => {
  return fs.readFileSync(input, 'utf8');
};

const assert = func => (input, output) => {
  const result = func(input);
  const matches = result === output;
  console.log(`${input} === ${output}:`, matches ? '\x1b[32m' : '\x1b[31m', matches ? 'true' : `false (${result})`, '\x1b[0m');
};
module.exports = { getInput, assert };

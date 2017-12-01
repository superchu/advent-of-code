const assert = func => (input, output) => {
  const matches = func(input) === output;
  console.log(`${input} === ${output}:`, matches ? '\x1b[32m' : '\x1b[31m', matches, '\x1b[0m');
};
module.exports = assert;

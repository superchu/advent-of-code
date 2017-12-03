const { assert } = require('../utils');
/*
37  36  35  34  33  32  31
38  17  16  15  14  13  30
30  18   5   4   3  12  29
40  19   6   1   2  11  28
41  20   7   8   9  10  27
42  21  22  23  24  25  26
43  44  45  46  47  48  49
*/

const input = 361527;

const distance = input => {
  const root = Math.ceil(Math.sqrt(input));
  const square = root + (root % 2 !== 0 ? 0 : 1);
  const innerOffset = (input - Math.pow(square - 2, 2)) % (square - 1) || 0;
  return (square - 1) / 2 + Math.abs(innerOffset - (square - 1) / 2);
};

console.log('\n-- Part 1 --');
assert(distance(1), 0);
assert(distance(12), 3);
assert(distance(23), 2);
assert(distance(1024), 31);
console.log('answer', distance(input));


const { assert, getInput } = require('../utils.js');
const input = getInput('./input.txt');

const part1 = input => {
  return input.toString().split('').reduce((sum, char, i, arr) => {
    if (char === arr[(i + 1) % arr.length]) {
      sum += char | 0;
    }
    return sum;
  }, 0);
}

console.log('-- Part 1 --');
assert(part1)(1122, 3);
assert(part1)(1111, 4);
assert(part1)(1234, 0);
assert(part1)(91212129, 9);
console.log('answer', part1(input));

const part2 = input => {
  return input.toString().split('').reduce((sum, char, i, arr) => {
    if (char === arr[(i + arr.length / 2) % arr.length]) {
      sum += char | 0;
    }
    return sum;
  }, 0);
};

console.log('\n-- Part 2 --');
assert(part2)(1212, 6);
assert(part2)(1221, 0);
assert(part2)(123425, 4);
assert(part2)(123123, 12);
assert(part2)(12131415, 4);
console.log('answer', part2(input))

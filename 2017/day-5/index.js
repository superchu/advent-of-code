const { assert, getInput } = require('../utils.js');
const input = getInput('./input.txt').split(/\n/g);;

const solve = (input, part2) => {
  const data = [...input];
  let steps = index = offset = 0;

  while (index < data.length) {
    steps++;
    offset = data[index] | 0;
    data[index] = offset + (part2 && offset >= 3 ? -1 : 1);
    index += offset;
  }

  return steps;
};

const example = ['0','3','0','1','-3'];
console.log('\n-- Part 1 --');
assert(solve(example), 5);
console.log('answer', solve(input));

console.log('\n-- Part 2 --');
assert(solve(example, true), 10);
console.log('answer', solve(input, true));

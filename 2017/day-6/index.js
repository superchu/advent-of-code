const { assert, getInput } = require('../utils.js');
const input = getInput('./input.txt').split(/\s/g);

const solve = (input, part2) => {
  const data = [...input].map(v => v | 0);
  const seen = [];
  let steps = 0;

  while (true) {
    steps++;

    const blocks = Math.max(...data);
    const index = data.indexOf(blocks);
    data[index] = 0;

    for (let n = index + 1; n < blocks + index + 1; n++) {
      data[n % data.length] += 1;
    }

    const value = data.join('');

    if (seen[value]) {
      return part2 ? steps - seen[value] : steps;
    }

    seen[value] = steps;
  }

  return steps;
};

const example = [0, 2, 7, 0];
console.log('\n-- Part 1 --');
assert(solve(example), 5);
console.log('answer', solve(input));

console.log('\n-- Part 2 --');
assert(solve(example, true), 4);
console.log('answer', solve(input, true));

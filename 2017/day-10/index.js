const { getInput } = require('../utils.js');
const input = getInput('./input.txt');

const part1 = (input, size, repeat = 1) => {
  let list = [...Array(size).keys()];
  let skip = 0;
  let current = 0;
  let i = 0;

  while (i < repeat) {
    input.forEach(length => {
      const things = [...Array(+length).keys()].map(i => (current + i) % list.length);
      const sublist = things.map(i => list[i]).reverse();
      things.forEach(i => list[i] = sublist.shift());
      current += (+length + skip) % list.length; 
      skip++;
    });
    i++;
  }

  return list;
};

const part2 = (input, size) => {
  const lengths = [...[...input].map(l => l.charCodeAt(0)), 17, 31, 73, 47, 23];
  const sparse = part1(lengths, 256, 64);

  return [...Array(size / 16).keys()].reduce((acc, i) => {
    const dense = sparse.slice(i * 16, (i + 1) * 16);
    const chunk = dense.reduce((x, y ) => x ^ y).toString(16);
    return `${acc}${chunk.length === 2 ? chunk : '0' + chunk}`;
  }, '');
};

const answer1 = part1(input.split(','), 256);
console.log('\n-- Part 1 --');
console.log('answer', answer1[0] * answer1[1]);

console.log('\n-- Part 2 --');
console.log('answer', part2(input, 256));

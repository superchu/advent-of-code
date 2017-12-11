const { getInput } = require('../utils.js');
const input = getInput('./input.txt').split(',');

const Direction = Object.freeze({
  nw: [-1, 1, 0],
  n: [0, 1, -1],
  ne: [1, 0, -1],
  sw: [-1, 0, 1],
  s: [0, -1, 1],
  se: [1, -1, 0],
});

const solve = input => {
  return input.reduce(({ pos, distance, max }, step) => {
    pos = pos.map((val, i) => val + Direction[step][i]);
    distance = Math.max(...pos.map(i => Math.abs(i)));
    if (distance > max) {
      max = distance;
    }
    return { pos, distance, max };
  }, { pos: [0, 0, 0], distance: 0, max: 0 });
};

const { distance, max } = solve(input);
console.log('\n-- Part 1 --');
console.log('answer', distance);

console.log('\n-- Part 2 --');
console.log('answer', max);
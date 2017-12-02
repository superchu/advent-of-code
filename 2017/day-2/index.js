const { assert, getInput } = require('../utils');
const input = getInput('./input.txt').split(/\n/);

const checksum = input => {
  return input.reduce((sum, row) => {
    const numbers = row.split(/\s/);
    sum += Math.max(...numbers) - Math.min(...numbers);
    return sum;
  }, 0);
};

console.log('-- Part 1 --');
assert(checksum)(['5 1 9 5', '7 5 3', '2 4 6 8'], 18);
console.log('answer', checksum(input));

const divisible = input => {
  return input.reduce((sum, row) => {
    const numbers = row.split(/\s/);

    let i = 0;
    while (i < numbers.length) {
      const current = +numbers[i];
      const matching = numbers
        .slice(i + 1)
        .find(num => +num !== current && (+num / current % 1 === 0 || current / +num % 1 === 0))
      ;

      if (matching) {
        sum += Math.max(current, matching) / Math.min(current, matching);
        break;
      }

      i++;
    }

    return sum;
  }, 0);
}

console.log('-- Part 2 --');
assert(divisible)(['5 9 2 8', '9 4 7 3', '3 8 6 5'], 9);
console.log('answer', divisible(input));

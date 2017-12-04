const { assert, getInput } = require('../utils.js');
const input = getInput('./input.txt').split(/\n/g);;

const validPhrases = (input, isInvalid) => {
  return input.reduce((sum, phrase) => {

    const words = phrase.split(/\s/g);
    let word;

    while (word = words.shift()) {
      if (words.find(w => isInvalid(w, word))) {
        return sum;
      }
    }

    sum++;

    return sum;
  }, 0);
};

const part1 = input => validPhrases(input, (w, word) => w === word);
const part2 = input => validPhrases(input, (w, word) => w.split('').sort().join('') === word.split('').sort().join(''));

const part1Input = `aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`.split(/\n/g);

const part2Input = `abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`.split(/\n/g);

console.log('-- Part 1 --');
assert(part1(part1Input), 2);
console.log('answer', part1(input));

console.log('-- Part 2 --');
assert(part2(part2Input), 3);
console.log('answer', part2(input));

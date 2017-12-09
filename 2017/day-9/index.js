const { getInput } = require('../utils.js');
const input = getInput('./input.txt').split('');

const processStream = input => {
  const Flags = Object.freeze({ GARBAGE: 1, IGNORE: 2 });
  return input.reduce(({ score, garbage, depth, flags }, char) => {
    if ((flags & Flags.IGNORE) !== 0) flags &= ~Flags.IGNORE;
    else if (char === '!') flags |= Flags.IGNORE;
    else if (char === '<' && (flags & Flags.GARBAGE) === 0) flags |= Flags.GARBAGE;
    else if (char === '>' && (flags & Flags.GARBAGE) !== 0) flags &= ~Flags.GARBAGE;
    else if (char === '{' && (flags & Flags.GARBAGE) === 0) score += ++depth;
    else if (char === '}' && (flags & Flags.GARBAGE) === 0) depth--;
    else if ((flags & Flags.GARBAGE) !== 0) garbage++;
    return { score, garbage, depth, flags };
  }, { score: 0, garbage: 0, depth: 0, flags: 0 });
};

const { score, garbage } = processStream(input);

console.log('\n-- Part 1 --');
console.log('answer', score);

console.log('\n-- Part 2 --');
console.log('answer', garbage);

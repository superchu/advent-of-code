const { getInput } = require('../utils.js');
const input = getInput('./input.txt').split(/\n/g);

class Registry {
  constructor() {
    this._map = new Map();
    this._highest = 0;
  }

  get(key) {
    const val = this._map.get(key);
    if (val === undefined) {
      return this.set(key, 0);
    }

    return val;
  }

  set(key, val) {
    if (val > this.highest) {
      this._highest = val;
    }
    this._map.set(key, val);
    return val;
  }

  get largest() {
    return Math.max(...Array.from(this._map.values()));
  }

  get highest() {
    return this._highest;
  }
}

const solve = (input, part2) => {
  const registry = new Registry();

  input.forEach(line => {
    const parts = line.split(/\s/g);
    const key = parts.shift();
    const instruction = parts.shift();
    const value = parts.shift() | 0;
    const condition = parts.splice(1);
    const dangerous = eval(`${registry.get(condition[0])}${condition[1]}${condition[2]|0}`);

    if (dangerous) {
      const oldValue = registry.get(key);
      if (instruction === 'inc') {
        registry.set(key, oldValue + value);
      } else {
        registry.set(key, oldValue - value);
      }
    }
  });

  const { largest, highest } = registry;

  return {
    largest,
    highest
  };
};

const { largest, highest } = solve(input);
console.log('\n-- Part 1 --');
console.log('answer', largest);

console.log('\n-- Part 2 --');
console.log('answer', highest);
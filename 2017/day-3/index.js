const { assert } = require('../utils');
/*                         57
37  36  35  34  33  32  31 56
38  17  16  15  14  13  30 55
30  18   5   4   3  12  29 54
40  19   6   1   2  11  28 53
41  20   7   8   9  10  27 52
42  21  22  23  24  25  26 51
43  44  45  46  47  48  49 50
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

const Direction = Object.freeze({
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
});

const screwit = input => {
  const getNextPosition = ({ x, y, direction }) => (
    direction === Direction.Up ? { x, y: --y } :
      direction === Direction.Down ? { x, y: ++y } :
        direction === Direction.Left ? { x: --x, y } :
          { x: ++x, y }
  );

  const getSum = (x, y, values) => (
    [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1]
    ].reduce((sum, xy) => sum += values[`${xy[0]},${xy[1]}`] || 0, 0)
  );

  const getNextDirection = direction => (
    {
      [Direction.Up]: Direction.Left,
      [Direction.Down]: Direction.Right,
      [Direction.Left]: Direction.Down,
      [Direction.Right]: Direction.Up,
    }[direction]
  );

  const isCorner = num => {
    const root = Math.ceil(Math.sqrt(num));
    const square = root + (root % 2 !== 0 ? 0 : 1);
    const indexInCycle = num - Math.pow(square - 2, 2);
    const innerOffset = indexInCycle % (square - 1) || 0;
    return num !== Math.pow(square, 2) && (innerOffset === 0 || indexInCycle === 1);
  };

  const { value } = [...Array(input + 1).keys()].splice(2, input)
    .reduce(({ x, y, direction, values, value }, num) => {
      const { x: nextX, y: nextY } = getNextPosition({ x, y, direction });

      if (!value) {
        const sum = getSum(nextX, nextY, values);
        values[`${nextX},${nextY}`] = sum;
        if (sum > input) {
          value = sum;
        }
      }

      if (isCorner(num)) {
        direction = getNextDirection(direction);
      }

      return { x: nextX, y: nextY, direction, values, value };
    }, { x: 0, y: 0, direction: Direction.Right, values: { '0,0': 1 }, value: 0 });

  return value;
}

console.log('\n-- Part 2 --');
console.log('answer', screwit(input));

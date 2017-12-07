const { getInput } = require('../utils.js');
const input = getInput('./input.txt').split(/\n/g);;

const toGraph = input => {
  const graph = {};
  input.forEach(line => {
    const parts = line.replace(/,/g, '').split(' ');
    const name = parts.shift();
    const weight = parts.shift().replace(/\(|\)/g, '') | 0;
    const children = parts.splice(1);
    graph[name] = { name, weight, children };
  });

  return graph;
};

const findRoot = graph => {
  return Object.values(graph).find((program, i, arr) => !arr.some(p => p.children.indexOf(program.name) !== -1));
};

const findUnbalanced = (program, graph) => {
  const children = program.children
    .map(c => {
      const child = graph[c];
      const weight = getWeight(child, graph);
      return { child, weight };
    })
    .sort((a, b) => a.weight > b.weight ? -1 : 1)
  ;

  if (children[0].weight !== children[1].weight) {
    const unbalanced = findUnbalanced(children[0].child, graph);
    if (unbalanced) {
      return unbalanced;
    }

    return children[0].child.weight - (children[0].weight - children[1].weight);
  }
};

const getWeight = (program, graph) => {
  const { weight, children } = program;
  return (children || []).reduce((sum, c) => {
    const child = graph[c];
    sum += getWeight(child, graph);
    return sum;
  }, weight);
};

const graph = toGraph(input);
const root = findRoot(graph);
const rebalanced = findUnbalanced(root, graph);

console.log('\n-- Part 1 --');
console.log('answer', root.name);
console.log('\n-- Part 2 --');
console.log('fixed weight', rebalanced);

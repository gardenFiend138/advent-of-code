const input = require('./input.js');

// part 1: sum input
const getFrequency = input => (
  input.reduce((acc, val) => acc + Number(val), 0)
);

// part 2: first repeating frequency
const getFirstDuplicateFrequency = () => {
  const seen = {};
  let frequency = 0;
  let num;

  while (true) {
    for (let i = 0; i < input.length; i++) {
      num = Number(input[i]);
      frequency += num;

      if (seen[frequency]) return frequency;

      seen[frequency] = true;
    }
  }

};

console.log(getFirstDuplicateFrequency());

module.exports = getFrequency;

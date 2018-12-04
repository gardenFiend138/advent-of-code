const input = require('./input.js');
// const input = [
//   'abcdef',
//   'bababc',
//   'abbcde',
//   'abcccd',
//   'aabcdd',
//   'abcdee',
//   'ababab',
// ];

function generateChecksum() {
  let idDuplicateCount = {};
  let twos = 0;
  let threes = 0;
  let id;
  let char;
  let twosIncremented;
  let threesIncremented;

  for (let i = 0; i < input.length; i++) {
    idDuplicateCount = {};
    twosIncremented = false;
    threesIncremented = false;

    for (let j = 0; j < input[i].length; j++) {
      id = input[i];
      char = id[j];
      if (idDuplicateCount[char]) {
        idDuplicateCount[char] += 1;
      } else {
        idDuplicateCount[char] = 1;
      }
    }

    Object.keys(idDuplicateCount).forEach((key) => {
      if (!twosIncremented && idDuplicateCount[key] === 2) {
        twos +=1;
        twosIncremented = true;
      }

      if (!threesIncremented && idDuplicateCount[key] === 3) {
        threes +=1;
        threesIncremented = true;
      }
    });
  }

  return twos * threes;
}

// part 2: find the id's that differ by only one char, and return the chars that
// are the same
function findPrototypeFabric() {
  const couldBe = {};

  for (let i = 0; i < input.length; i++) {
    couldBe[input[i]] = [];

    for (let j = i + 1; j < input.length; j++) {
      // if 2 out of 3 initial chars aren't the same, they can't be the boxes
      if (twoOutOfThree(input[i], input[j])) {
        couldBe[input[i]].push(input[j]);
      }
      }
    }

  Object.keys(couldBe).forEach((key) => {
    const possibilities = couldBe[key];

    possibilities.forEach((possibility) => {
      if (offByOne(key, possibility)) {
        console.log('key, possibility', key, possibility);
        return [key, possibility];
      }
    });
  });
}

function twoOutOfThree(string1, string2) {
  let count = 0;

  for (let i = 0; i < 3; i++) {
    if (string1[i] === string2[i]) count++;
  }

  return count > 1;
}

function offByOne(string1, string2) {
  if (string1.length !== string2.length) return false;
  let count = 0;

  for (let i = 0; i < string1.length; i++) {
    if (string1[i] === string2[i]) count++;
  }

  return count === string1.length - 1;
}

// ans: lufjygedpvfbhftxiwnaorzmq

// console.log(generateChecksum());
console.log(findPrototypeFabric());
// console.log('twoOutOfThree', twoOutOfThree('abcde', 'axcde'));
// console.log('twoOutOfThree', twoOutOfThree('abcde', 'bbcde'));
// console.log('twoOutOfThree', twoOutOfThree('abcde', 'bbbde'));
// console.log('offByOne', offByOne('abcde', 'abcdr'));
// console.log('offByOne', offByOne('abcde', 'abcer'));

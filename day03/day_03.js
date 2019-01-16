const input = require('./input.js');
const BEST_CLAIM = {};
// const input = [
//   '#1 @ 1,3: 4x4',
//   '#2 @ 3,1: 4x4',
//   '#3 @ 5,5: 2x2',
//   '#4 @ 5,5: 2x2'
// ]

// example claim:
// #1 @ 872,519: 18x18
function countOverlappingSquares() {
  let matrix = buildMatrix();
  let claim;
  let count = 0;
  let bestClaim;

  for (let i = 0; i < input.length; i++) {
    claim = input[i];
    let result = fillDimensions(matrix, claim);
    matrix = result.matrix;

    if (result.notOverlappingClaim) {
      bestClaim = result.notOverlappingClaim;
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    let row = matrix[i];

    for (let j = 0; j < row.length; j++) {
      if (row[j] === 'x') {
        count++;
      }
    }
  }

  return { count, bestClaim: Object.keys(BEST_CLAIM).map(key => key) };
}

function fillDimensions(matrix, claim) {
  const { indices, dimensions, id } = getIndicesAndDimensions(claim);
  let overlaps = false;
  let notOverlappingClaim;

  for (let i = indices[0]; i < dimensions[0] + indices[0]; i++) {
    for (let j = indices[1]; j < dimensions[1] + indices[1]; j++) {
      // if (!matrix[j]) matrix[j] = [];
      if (hasIndices(matrix, [j, i])) {
        if (BEST_CLAIM[matrix[j][i]]) delete BEST_CLAIM[matrix[j][i]];
        matrix[j][i] = 'x';
        overlaps = true;
      } else {
        matrix[j][i] = id;
      }
      // matrix[j][i] = hasIndices(matrix, [j, i]) ? 'x' : id; // fills the rows
    }
  }
  notOverlappingClaim = !overlaps ? claim : null;
  if (notOverlappingClaim) BEST_CLAIM[id] = claim; // && console.log('notOverlappingClaim', notOverlappingClaim);
  return { matrix, notOverlappingClaim };
}

function getIndicesAndDimensions(claim) {
  // '#1 @ 872,519: 18x18'
  const info = claim.split(' @ ');
  const id = info[0].slice(1);
  const necessaryInfo = info[1].split(': '); // ['872,519', '18x18']
  const indices = necessaryInfo[0]
    .split(',') // ['872', '519']
    .map(idx => Number(idx)); // [872, 519]
  const dimensions = necessaryInfo[1]
    .split('x') // ['18', '18'];
    .map(dimension => Number(dimension)); // [18, 18]

  return { indices, dimensions, id };
}

function hasIndices(matrix, indices) {
  return !!matrix[indices[0]] && !!matrix[indices[0]][indices[1]];
}

function buildMatrix() {
  // const matrix = new Array(1000).map(row => new Array(1000));
  const matrix = [];

  for (let i = 0; i < 1000; i++) {
    matrix[i] = [];
    for (let j = 0; j < 1000; j++) {
      matrix[i][j] = 0;
    }
  }

  return matrix;
  // return matrix.map(row => row.map(space => 0));
}

function matrixGreaterThan1000() {
  let claim;

  for (let i = 0; i < input.length; i++) {
    claim = input[i];
    let { indices } = getIndicesAndDimensions(claim);

    if (indices[0] > 1000 || indices[1] > 1000) return true;
  }

  return false;
}

// console.log(getIndicesAndDimensions('#1 @ 872,519: 18x18'));
// console.log(matrixGreaterThan1000());
// console.log(buildMatrix()[0]);
// console.log(countOverlappingSquares());
console.log('countOverlappingSquares', countOverlappingSquares());

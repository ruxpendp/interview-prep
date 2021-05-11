// Given an N-sided die, make a K-sided die.

/*--------------------------*/

// returns an integer in the range [1, n] with equal probability
const rollN = n => Math.floor(Math.random() * n) + 1;

// using only rollN(n), returns an integer in the range [1, k] with equal probability
// assumes n and k are integers larger than 1.
const rollK = (n, k) => {
  // How many rolls do we need to make?
  // Every successive rollN() multiplies the total number of possible results by n.
  // n^x >= k
  // <=> ln(n^x) >= ln(k)
  // <=> x * ln(n) >= ln(k)
  // <=> x >= ln(k) / ln(n)     for positive integers of n
  const rolls = Math.ceil(Math.log(k) / Math.log(n));

  const possibleRolls = Math.pow(n, rolls);
  const setsOfK = Math.floor(possibleRolls / k);
  const limit = k * setsOfK;

  while (true) {
    let total = 0;
    for (let i = 0; i < rolls; i++) {
      total += (rollN(n) - 1) * Math.pow(n, i);
    }
    if (total >= limit) continue;
    return total % k + 1;
  }
};

/*--------------------------*/

// tests
const PAIRS = [[5, 7], [3, 100], [10, 3]];

const doRolls = (n, k) => {
  const results = {};
  for (let i = 0; i < 100000; i++) {
    const roll = rollK(n, k);
    if (!(roll in results)) results[roll] = 1;
    else results[roll]++;
  }
  console.log(`${n} -> ${k}`);
  console.log(results);
};

PAIRS.forEach(([n, k]) => doRolls(n, k));

// Given an N-sided die, make a K-sided die.

/*--------------------------*/

// returns an integer in the range [1, n] with equal probability
const rollN = n => Math.floor(Math.random() * n) + 1;

// using only rollN(n), returns an integer in the range [1, k] with equal probability
// assumes n and k are integers larger than 1
const rollK = (n, k) => {
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

/*--------------------------*/

/*
* Commentary:
*
* After solving D5 -> D7 (see simulate7SidedDie.js), of course the real fun part is generalizing
* to Dn -> Dk.
*
* Some extra problems arise, the first one being "How many rolls do we need to make?"
*
* We know that every successive Dn roll multiplies the total number of possible results by n.
* Hence we are solving    n^x >= k    for x.
*         <=>         ln(n^x) >= ln(k)
*         <=>        x * ln(n) >= ln(k)
*         <=>        x >= ln(k) / ln(n)     for positive integers of n
*
* If you forgot how you used to manipulate exponents/logarithms like butter in college (I had to
* look it up too), you can always "brute force" this solution by trying each successive power of n
* until you got a result that exceeded k. In a real coding interview I probably would've had to
* take this approach.
*
* From there we must calculate the upper bound after which we must throw out/reroll, and create our
* base-n number and convert to base 10 just like the D5 -> D7 problem.
*
* Note that we don't really need any special handling for when n >= k – we're just trying to find a
* number of Dn rolls that give more possible results than k, then taking the modulus to maximize the
* number of results we can use. When n >= k, x just becomes 1 and the rest of the problem works the
* same.
*
* Also note that n has to be greater than 1. A 1-sided die only has 1 possible result no matter how
* many times you reroll. k can technically be 1 but simulating a 1-sided die is... trivial.
*
* Super fun problem!
*/

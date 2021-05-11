// Given a 5-sided die, make a 7-sided die.

/*--------------------------*/

// returns an integer in the range [1, 5] with equal probability
const roll5 = () => Math.floor(Math.random() * 5) + 1;

// using only roll5(), returns an integer in the range [1, 7] with equal probability
const roll7 = () => {
  while (true) {
    const total = (roll5() - 1) * 5 + (roll5() - 1);
    if (total >= 21) continue;
    return total % 7 + 1;
  }
};

/*--------------------------*/

// tests
const results = {};
for (let i = 0; i < 100000; i++) {
  const roll = roll7();
  if (!(roll in results)) results[roll] = 1;
  else results[roll]++;
}
console.log(results);

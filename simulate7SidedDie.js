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

/*--------------------------*/

/*
* Commentary:
*
* My initial instinct was to find some combination of rolls that would yield exactly 35 possible
* results, 35 being the least common multiple of 5 and 7. This way a range of 5 results would
* all map to one result on the 7-sided die.
*
* The crux for me was realizing that it doesn't matter what probability each result has of
* occurring, as long as each result has the *same* probabiliy of occurring. Thus we can map
* any 7 results on a combo of D5 rolls to their respective D7 values, and just throw out/reroll any
* result that doesn't map to anything.
*
* From there, it naturally followed that we'd be wasting a lot of rolls if we threw out all but the
* first 7 possible results, so taking the modulus allows us to map 3 results to each D7 roll.
*
* As for the D5 roll combo, it was pretty clear to me from the start that two rolls nets 5^2
* possibilities, essentially creating a base-5 number which would need to be converted back to base
* 10. Important not to just take the sum of D5 rolls, as different sums have different odds.
*/

// Given an array of integers, find the highest product of three of them.

/*--------------------------*/

// assumes at least 3 ints given
const highestProductOf3 = ints => {
  let highest = Math.max(ints[0], ints[1]);
  let lowest = Math.min(ints[0], ints[1]);
  let highest2 = ints[0] * ints[1];
  let lowest2 = ints[0] * ints[1];
  let highest3 = ints[0] * ints[1] * ints[2];

  for (let i = 2; i < ints.length; i++) {
    const current = ints[i];
    highest3 = Math.max(highest3, current * highest2, current * lowest2);
    lowest2 = Math.min(lowest2, current * highest, current * lowest);
    highest2 = Math.max(highest2, current * highest, current * lowest);
    lowest = Math.min(lowest, current);
    highest = Math.max(highest, current);
  }

  return highest3;
};

/*--------------------------*/

// tests
console.log(highestProductOf3([-10, -10, 8, 2, 6]));
console.log(highestProductOf3([1, 3, 2, 6, 0]));

/*--------------------------*/

/*
* Commentary:
*
* Lots of tricks and traps here, and I seemed to fall into most of them along the way...
* First instinct was to sort the array and just take the highest 3 numbers and multiply them. From
* there I realized we could take a greedy approach and just keep track of the max 3 in one pass
* without having to sort (which is O(n) instead of O(nlogn)). At some point an interviewer might've
* stopped me, but instead I spent some time implementing this solution before realizing I had
* neglected to consider what happens when negative numbers are passed in.
*
* So I then started adapting my solution to support negative integers – we can split the array into
* positive and negative numbers, then calculate the maximums of combinations of positive and
* negative: 3 positive, 1 positive 2 negative, and then if there aren't enough positives or
* negatives you have to consider 2 positive 1 negative, 3 negative...
*
* At this point I thought the solution was getting more complicated than it felt like it should
* have. So I took a step back. It felt like a greedy one pass solution should be possible. I
* started thinking about how to track highest product of 2. From there the crux for me was realizing
* how the highest product of 3 relates to both the highest product of 2 and the *lowest* product of
* 2.
*/

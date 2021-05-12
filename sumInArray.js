// Given an array of integers and a target sum, determine if there exists two integers in the array
// that add up to equal the target sum.

/*--------------------------*/

const sumInArray = (ints, target) => {
  const remainders = new Set();
  for (const int of ints) {
    if (remainders.has(int)) return true;
    remainders.add(target - int);
  }
  return false;
};

/*--------------------------*/

// tests
console.log(sumInArray([1, 2, 3, 4, 5], 10));
console.log(sumInArray([1, 2, 3, 4, 5], 8));
console.log(sumInArray([4, -2, 0, 100], -2));
console.log(sumInArray([5, 1, 7, 2], 100));
console.log(sumInArray([5, 1, 1, 1], 10));

/*--------------------------*/

/*
* Commentary:
*
* After getting brute force out of the way, it was clear we could reduce the lookup of the second
* int to O(1) by sticking them in a set. I initially started by putting all (target - int)
* remainders into a set and then passing through again looking for matches. But this solution falls
* down if your target is exactly twice as much as one of the ints. After some consideration I
* realized we only need to check against remainders we have seen previous, since a + b = b + a.
* This conveniently also avoids matching an int with its own remainder.
*
* Sometimes these problems can be trickier to do alone than with an interviewer. Most interviewers
* want to evaluate how you collaborate and respond to feedback to work through a problem, so often
* times thinking out loud and asking the right questions will get you nudges in the right direction.
*/

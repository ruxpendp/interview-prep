/*
* Create a function that adds integers passed in one argument at a time.
*
* For example:
* add(2)(3)() => returns 5
* add(5)(3)(9)(100)() => returns 117
* add(0)(-2)(1)(-3)() => returns -4
*/

/*--------------------------*/

const add = int => {
  let total;

  const innerAdd = innerInt => {
    if (innerInt === undefined) return total;
    if (!total) total = 0;
    total += innerInt;
    return innerAdd;
  }

  return innerAdd(int);
};

/*--------------------------*/

// tests
console.log(add(2)(3)());
console.log(add(5)(3)(9)(100)());
console.log(add(0)(-2)(1)(-3)());
console.log(add());

/*--------------------------*/

/*
* Commentary:
*
* Nifty problem that makes use of currying and closures in javascript. I've cheated because I'd seen
* this problem already, but the crucial thing to realize is that add(x) needs to return a function.
* Another clue is that every example ends with no arguments passed in the last call, which is the
* signal for the function to now return the actual total.
*/

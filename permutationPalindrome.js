// Given a string of lowercase letters,
// determine whether any permutation of the string is a palindrome.

/*--------------------------*/

const hasPermutationPalindrome = word => {
  const oddLetters = [...word].reduce(
    (letters, letter) => {
      if (letters.has(letter)) letters.delete(letter);
      else letters.add(letter);
      return letters;
    },
    new Set()
  );

  return oddLetters.size <= 1;
};

/*--------------------------*/

// tests
console.log(hasPermutationPalindrome('asdffdsa'));
console.log(hasPermutationPalindrome('yeah'));
console.log(hasPermutationPalindrome('yeahyeah'));
console.log(hasPermutationPalindrome('ilovechicken'));
console.log(hasPermutationPalindrome('gooddog'));

/*--------------------------*/

/*
* Commentary:
* What makes a palindrome a palindrome? Any letter found on one side of the word is also on the
* other side, except for the middle letter if there is one. The crucial takeaway is that
* palindrome letters come in pairs (again except for the middle one). So we can simply count the
* frequency of each letter, store those key value pairs in an object, then go through that object
* looking to find 0 or 1 odd frequencies.
*
* From there, we realize that we don't even need to store frequencies, just throw new letters into
* a set and take them out if they're already there. Then just check if the set has 0 or one items.
*/

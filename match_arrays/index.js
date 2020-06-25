// facebook phone interview question

/*
foos = [[1, 'a'], [7, 'b'], [5, 'c'], [6, 'b'], [9, 'e']]
bars = [['a', 3], ['a', 2], ['d', 1], ['b', 5], ['c', 2]]

foobar(foos, bars) == [[1, 3], [1, 2], [7, 5], [5, 2], [6, 5]]



Question 1. Using the input above, what is the foobar function doing?
Question 2. Write the foobar function using optimal time and space complexity.
*/

// M as length of foos
// N as length of bars

// SPACE: O(N) + O(O)
// TIME: O(N) + O(M) = O(N + M)
function foobar(foos, bars) {
  if (foos.length === 0 || bars.length === 0) {
    return [];
  }

  // make a hash where the key is a char (any bars[0]) the value is [all bars[1] that match]

  /*
    a: [3, 2],
    d: [1],
    b: [5]
    c: [2]
  */

  const hash = {}; // SPACE:  O(N) TIME:  O(N)
  for (const [key, val] of bars) {
    hash[key] = hash[key] || [];
    hash[key].push(val);
  }

  const output = [];
  // foos = [[1, 'a'], [7, 'b'], [5, 'c'], [6, 'b'], [9, 'e']]
  // iterate through foos.  for each foo[1], find those numbers in hash
  // form n tuples where tuple[0] = foo[0], tuple[1] = current retrieved hash item
  /*
  output=[[1, 3], [1, 2], [7, 5], [5, 2], [6, 5]]
  num= 9
  char=e
  otherNum= 
  hash[e] = [5]
  */
  for (const [num, char] of foos) {
    // O(M)
    if (!hash[char]) {
      // O(1)
      continue;
    }

    for (const otherNum of hash[char]) {
      // O(M)
      output.push([num, otherNum]); // O(O) O length of output array
    }
  }

  return output;
}

const foos = [
  [1, 'a'],
  [7, 'b'],
  [5, 'c'],
  [6, 'b'],
  [9, 'e'],
];
const bars = [
  ['a', 3],
  ['a', 2],
  ['d', 1],
  ['b', 5],
  ['c', 2],
];
console.log(JSON.stringify(foobar(foos, bars)));

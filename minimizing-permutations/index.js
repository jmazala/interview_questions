// https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=292715105029046
// Add any extra import statements you may need here

// const _ = require('lodash');

function reverse(arr, start, end) {
  const copy = Array.from(arr);
  while (start < end) {
    const temp = copy[start];
    copy[start] = copy[end];
    copy[end] = temp;
    start++;
    end--;
  }

  return copy;
}

function minOperations(arr) {
  if (isCorrect(arr)) {
    return 0;
  }

  const set = new Set();
  let steps = 0;
  const queue = [arr];

  // BFS for the answer.  each permutation is a node in the graph.
  while (queue.length) {
    steps++;
    let numNodes = queue.length;

    while (numNodes) {
      const current = queue.shift();
      numNodes--;

      set.add(JSON.stringify(current));

      // we have an edge with cost 1 to get to other permutations
      // where those permutations are formed by reversing 1 sub portion
      // of the original array

      // narrow down the problem by starting reversals when necessary
      // i.e. fix the correct elements at the beginning

      for (let i = 0; i < current.length; i++) {
        if (current[i] === i + 1) {
          continue;
        }

        for (let j = i + 1; j < current.length; j++) {
          const nextWithIAndJ = reverse(current, i, j);
          if (!set.has(JSON.stringify(nextWithIAndJ))) {
            if (isCorrect(nextWithIAndJ)) {
              return steps;
            }
            queue.push(nextWithIAndJ);
          }
        }
      }
    }
  }

  // this should never hit
  return -1;

  function isCorrect(a) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== i + 1) {
        return false;
      }
    }

    return true;
  }
}

// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom, but they are otherwise not editable!
function printInteger(n) {
  const out = `[${n}]`;
  return out;
}

let test_case_number = 1;

function check(expected, output) {
  const result = expected == output;
  const rightTick = '\u2713';
  const wrongTick = '\u2717';
  if (result) {
    const out = `${rightTick} Test #${test_case_number}`;
    console.log(out);
  } else {
    let out = '';
    out += `${wrongTick} Test #${test_case_number}: Expected `;
    out += printInteger(expected);
    out += ' Your output: ';
    out += printInteger(output);
    console.log(out);
  }
  test_case_number++;
}

const n_1 = 5;
const arr_1 = [1, 2, 5, 4, 3];
const expected_1 = 1;
const output_1 = minOperations(arr_1);
check(expected_1, output_1);

const n_2 = 3;
const arr_2 = [3, 1, 2];
const expected_2 = 2;
const output_2 = minOperations(arr_2);
check(expected_2, output_2);

// Add your own test cases here

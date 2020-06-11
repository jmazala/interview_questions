// https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=559324704673058
// Add any extra import statements you may need here

// Add any helper functions you may need here

function matchingPairs(s, t) {
  let answer = -Infinity;

  // swap at all combinations i and j
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      answer = Math.max(answer, countWithSwap(i, j));
    }
  }
  // count matches after the swap
  // answer = Max(answer, swaps)

  return answer;

  function countWithSwap(i, j) {
    // JUST MODIFYING INDEXES
    let count = 0;
    for (let tIndex = 0; tIndex < t.length; tIndex++) {
      let sIndex = tIndex;
      // do the actual swap
      if (tIndex === i) {
        sIndex = j;
      } else if (tIndex === j) {
        sIndex = i;
      }

      if (s[sIndex] === t[tIndex]) {
        count++;
      }
    }

    return count;
  }

  // CONVERTING TO ARRAY AND ACTUALLY SWAPPING
  // function countWithSwap(i, j) {
  //   const count = 0;
  //   const arr = s.split('');
  //   const temp = arr[i];
  //   arr[i] = arr[j];
  //   arr[j] = temp;

  //   for (let x = 0; x < arr.length; x++) {
  //     if (arr[x] === t[x]) {
  //       count++;
  //     }
  //   }

  //   return count;
  // }
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
    var out = `${rightTick} Test #${test_case_number}`;
    console.log(out);
  } else {
    var out = '';
    out += `${wrongTick} Test #${test_case_number}: Expected `;
    out += printInteger(expected);
    out += ' Your output: ';
    out += printInteger(output);
    console.log(out);
  }
  test_case_number++;
}

const s_1 = 'abcde';
const t_1 = 'adcbe';
const expected_1 = 5;
const output_1 = matchingPairs(s_1, t_1);
check(expected_1, output_1);

const s_2 = 'abcd';
const t_2 = 'abcd';
const expected_2 = 2;
const output_2 = matchingPairs(s_2, t_2);
check(expected_2, output_2);

// Add your own test cases here

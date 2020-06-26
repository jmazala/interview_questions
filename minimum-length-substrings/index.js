// https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=2237975393164055
// Add any extra import statements you may need here

// Add any helper functions you may need here

function minLengthSubstring(s, t) {
  let answer = Infinity;

  const hash = {};
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    hash[c] = hash[c] || 0;
    hash[c]++;
  }

  let start = 0;

  // find the first eligible character for start
  while (!hash[s[start]]) {
    start++;
  }

  let end = start;
  // expand the sliding window until we've gotten all chars
  while (end < s.length) {
    const charToRemove = s[end];
    if (charToRemove in hash) {
      hash[charToRemove]--;
    }

    if (Object.values(hash).some((count) => count > 0)) {
      end++;
      continue;
    }

    // we now have our initial sliding window size
    answer = Math.min(answer, end - start + 1);
    const charToAddBack = s[start];
    hash[charToAddBack]++;
    start++;

    while (start < end && hash[s[start]] === undefined) {
      start++;
    }

    // since we don't increment end, just put it back
    hash[charToRemove]++;
  }

  return answer === Infinity ? -1 : answer;
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

const s_1 = 'dcbefebce';
const t_1 = 'fd';
const expected_1 = 5;
const output_1 = minLengthSubstring(s_1, t_1);
check(expected_1, output_1);

const s_2 = 'bfbeadbcbcbfeaaeefcddcccbbbfaaafdbebedddf';
const t_2 = 'cbccfafebccdccebdd';
const expected_2 = -1;
const output_2 = minLengthSubstring(s_2, t_2);
check(expected_2, output_2);

const s_3 = 'dcbefxdbce';
const t_3 = 'df';
const expected_3 = 3;
const output_3 = minLengthSubstring(s_3, t_3);
check(expected_3, output_3);

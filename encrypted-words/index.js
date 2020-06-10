// Add any extra import statements you may need here

// Add any helper functions you may need here

function findEncryptedWord(s) {
  if (!s) {
    return '';
  }

  if (s.length === 1) {
    return s;
  }

  let r = '';
  const middleIndex =
    s.length % 2 === 0 ? s.length / 2 - 1 : Math.floor(s.length / 2);

  r += s[middleIndex];
  r += findEncryptedWord(s.slice(0, middleIndex));
  r += findEncryptedWord(s.slice(middleIndex + 1));
  return r;
}

// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom, but they are otherwise not editable!
function printString(str) {
  const out = `["${str}"]`;
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
    out += printString(expected);
    out += ' Your output: ';
    out += printString(output);
    console.log(out);
  }
  test_case_number++;
}

const s_1 = 'abc';
const expected_1 = 'bac';
const output_1 = findEncryptedWord(s_1);
check(expected_1, output_1);

const s_2 = 'abcd';
const expected_2 = 'bacd';
const output_2 = findEncryptedWord(s_2);
check(expected_2, output_2);

// Add your own test cases here
const s_3 = 'abcxcba';
const expected_3 = 'xbacbca';
const output_3 = findEncryptedWord(s_3);
check(expected_3, output_3);

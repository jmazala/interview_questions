// https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=146466059993201
// Add any extra import statements you may need here

// Add any helper functions you may need here

function findSignatureCounts(arr) {
  const signatures = Array(arr.length).fill(1); // fill 1 because everyone signs their own yearbook
  for (let student = 0; student < arr.length; student++) {
    let yearbookHolder = student;
    while (arr[yearbookHolder] !== student + 1) {
      signatures[student]++;
      yearbookHolder = arr[yearbookHolder] - 1;
    }
  }

  return signatures;
}

// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom, but they are otherwise not editable!
function printintegerArray(array) {
  const size = array.length;
  let res = '';
  res += '[';
  let i = 0;
  for (i = 0; i < size; i++) {
    if (i !== 0) {
      res += ', ';
    }
    res += array[i];
  }
  res += ']';
  return res;
}

let test_case_number = 1;

function check(expected, output) {
  const expected_size = expected.length;
  const output_size = output.length;
  let result = true;
  if (expected_size != output_size) {
    result = false;
  }
  for (let i = 0; i < Math.min(expected_size, output_size); i++) {
    result &= output[i] == expected[i];
  }
  const rightTick = '\u2713';
  const wrongTick = '\u2717';
  if (result) {
    var out = `${rightTick} Test #${test_case_number}`;
    console.log(out);
  } else {
    var out = '';
    out += `${wrongTick} Test #${test_case_number}: Expected `;
    out += printintegerArray(expected);
    out += ' Your output: ';
    out += printintegerArray(output);
    console.log(out);
  }
  test_case_number++;
}

const arr_1 = [2, 1];
const expected_1 = [2, 2];
const output_1 = findSignatureCounts(arr_1);
check(expected_1, output_1);

const arr_2 = [1, 2];
const expected_2 = [1, 1];
const output_2 = findSignatureCounts(arr_2);
check(expected_2, output_2);

// Add your own test cases here

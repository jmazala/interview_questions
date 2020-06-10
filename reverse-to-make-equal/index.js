// https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=2869293499822992

function areTheyEqual(array_a, array_b) {
  if (array_a.length !== array_b.length) {
    return false;
  }

  let i = 0;

  while (true) {
    while (i < array_a.length && array_a[i] === array_b[i]) {
      i++;
    }

    if (i === array_a.length) {
      return true;
    }

    reverseB(i);
    if (array_a[i] !== array_b[i]) {
      return false;
    }
  }

  function reverseB(start) {
    let end = array_b.length - 1;
    while (start < end) {
      const temp = array_b[start];
      array_b[start] = array_b[end];
      array_b[end] = temp;
      start++;
      end--;
    }
  }
}

// These are the tests we use to determine if the solution is correct.
// You can add your own at the bottom, but they are otherwise not editable!
function printString(str) {
  var out = '["' + str + '"]';
  return out;
}

var test_case_number = 1;

function check(expected, output) {
  var result = (expected == output);
  var rightTick = "\u2713";
  var wrongTick = "\u2717";
  if (result) {
    var out = rightTick + ' Test #' + test_case_number;
    console.log(out);
  }
  else {
    var out = '';
    out += wrongTick + ' Test #' + test_case_number + ': Expected ';
    out += printString(expected);
    out += ' Your output: ';
    out += printString(output);
    console.log(out);
  }
  test_case_number++;
}

var array_a_1 = [1, 2, 3, 4];
var array_b_1 = [1, 4, 3, 2];
var expected_1 = true;
var output_1 = areTheyEqual(array_a_1, array_b_1);
check(expected_1, output_1);

var array_a_2 = [1, 2, 3, 4];
var array_b_2 = [1, 4, 3, 3];
var expected_2 = false;
var output_2 = areTheyEqual(array_a_2, array_b_2);
check(expected_2, output_2);

// Add your own test cases here

// Add any extra import statements you may need here

// Add any helper functions you may need here
function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

// pointers.  we are doing linear scan through the array
// but we aren't slicing arrays.
// this will be O(n log n) to sort, and O(n) to compare
function balancedSplitExists(arr) {
  const total = sum(arr);
  let left = 0;
  let right = total;

  arr.sort((a, b) => a - b);

  for (let i = 0; i < arr.length; i++) {
    left += arr[i];
    right -= arr[i];

    if (left === right) {
      return arr[i] < arr[i + 1];
    }
  }

  return false;
}

// sorting and binary search
// O(n log n) to sort
// O(log n) iterations of doing the slices which is O(n)
// so this is O(n log n) but worst case is worse than pointers.
// best case is better than pointers
// function balancedSplitExists(arr) {
//   // sort arr ascending
//   arr.sort((a, b) => a - b);

//   // binary search for partition split

//   let low = 0;
//   let high = arr.length;

//   while (low <= high) {
//     const mid = Math.floor((low + high) / 2);
//     const a = arr.slice(0, mid);
//     const b = arr.slice(mid);

//     const sumA = sum(a);
//     const sumB = sum(b);

//     if (sumA === sumB) {
//       return a[a.length - 1] < b[0];
//     }

//     // sum a is too low.  move partition further to the right
//     if (sumA < sumB) {
//       low = mid + 1;
//     } else {
//       high = mid;
//     }
//   }

//   return false;
// }

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

const arr_1 = [2, 1, 2, 5];
const expected_1 = true;
const output_1 = balancedSplitExists(arr_1);
check(expected_1, output_1);

const arr_2 = [3, 6, 3, 4, 4];
const expected_2 = false;
const output_2 = balancedSplitExists(arr_2);
check(expected_2, output_2);

const arr_3 = [1, 5, 7, 1];
const expected_3 = true;
const output_3 = balancedSplitExists(arr_3);
check(expected_3, output_3);

const arr_4 = [12, 7, 6, 7, 6];
const expected_4 = false;
const output_4 = balancedSplitExists(arr_4);
check(expected_4, output_4);

// Add your own test cases here

// https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=226517205173943
// store left and right subarrays

// WORKING ON O(n) solution but damn this is tough
// function countSubarrays(arr) {
//   const result = Array(arr.length).fill(0);
//   for (const a of [arr, arr.reverse()]) {
//     const G = Array(a.length).fill(0);
//     let maxSoFar = a[0];
//     let maxIndex = 0;

//     for (let i = 1; i < a.length; i++) {
//       if (a[i] > maxSoFar) {
//         G[i] = 0;
//         maxSoFar = a[i];
//         maxIndex = i;
//         continue;
//       }
//       /*
//         go backwards until the max index we've seen and look for index j where
//         arr[j] > arr[i]
//       */
//       let j = i - 1;
//       while (j > maxIndex) {
//         if (a[j] > a[i]) {
//           break;
//         }

//         j--;
//       }

//       G[i] = j;
//     }

//     for (let i = 0; i < a.length; i++) {
//       result[i] += i - G[i];
//     }
//   }

//   return result.map((i) => i - 1);
// }

/*
  We can next observe that the index of the latest element
  to the left of the ith element which is larger than it
  determines which subarrays ending at index i are valid
  - specifically, the ones beginning to the right of that larger element.
  */

/*
  Letting G[i] be equal to the largest index j such that j < i and a[j] > a[i]
    (or equal to 0 if there’s no such j), then L[i] = i - G[i]
  */

/*
  Out of earlier indices j(such that j < i),
  we can consider which indices are worth considering as potential candidates for G[i]
  - for example, if there exists a pair of indices j and k
  such that j < k and a[j] < a[k],
  can index j ever be a candidate for G[i] for any i > k ? 
  */

// O(n^2) approach
function countSubarrays(arr) {
  const result = Array(arr.length).fill(1); // each number is it's own subarray

  // let's try add left, and go right in 1 loop
  // O(n)
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    // O(n/2) worst case
    let j = i - 1;
    while (arr[j] < num) {
      result[i]++;
      j--;
    }

    // O(n/2) worst case
    let k = i + 1;
    while (arr[k] < num) {
      result[i]++;
      k++;
    }
  }

  return result;
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

let testCaseNumber = 1;

function check(expected, output) {
  const expectedSize = expected.length;
  const outputSize = output.length;
  let result = true;
  if (expectedSize !== outputSize) {
    result = false;
  }
  for (let i = 0; i < Math.min(expectedSize, outputSize); i++) {
    // eslint-disable-next-line no-bitwise
    result &= output[i] === expected[i];
  }
  const rightTick = '\u2713';
  const wrongTick = '\u2717';
  if (result) {
    const out = `${rightTick} Test #${testCaseNumber}`;
    console.log(out);
  } else {
    let out = '';
    out += `${wrongTick} Test #${testCaseNumber}: Expected `;
    out += printintegerArray(expected);
    out += ' Your output: ';
    out += printintegerArray(output);
    console.log(out);
  }
  testCaseNumber++;
}

const test1 = [3, 4, 1, 6, 2];
const expected1 = [1, 3, 1, 5, 1];
const output1 = countSubarrays(test1);
check(expected1, output1);

const test2 = [2, 4, 7, 1, 5, 3];
const expected2 = [1, 2, 6, 1, 3, 1];
const output2 = countSubarrays(test2);
check(expected2, output2);

// Add your own test cases here

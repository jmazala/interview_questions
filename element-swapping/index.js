// https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=838749853303393

function findMinArray(arr, k) {
  let smallest = arr;
  const seen = new Set([]);
  helper(arr, k);
  return smallest;

  function helper(current, swapsRemaining) {
    const key = current.join(',');
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    smallest = Array.from(lexicographicSmallest(smallest, current));

    if (swapsRemaining === 0) {
      return;
    }

    // can only swap consecutive letters / numbers
    for (let i = 0; i < current.length - 1; i++) {
      if (current[i] < current[i + 1]) {
        // already lexicographically better.  don't swap
        continue;
      }

      swap(current, i, i + 1);
      helper(current, swapsRemaining - 1);
      swap(current, i + 1, i);
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function lexicographicSmallest(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] < arr2[i]) {
      return arr1;
    }

    if (arr2[i] < arr1[i]) {
      return arr2;
    }
  }

  // they are equal
  return arr1;
}

console.log(JSON.stringify(findMinArray([5, 3, 1], 2))); // [1, 5, 3]
console.log(JSON.stringify(findMinArray([8, 9, 11, 2, 1], 3))); // [2, 8, 9, 11, 1]

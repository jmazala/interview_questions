//https://www.youtube.com/watch?v=4eWKHLSRHPY&list=WL&index=13
function sortedSquaredArrayPointersWhileLoop(nums) {
  let low = 0;
  let high = nums.length - 1;
  const answer = [];

  while (low <= high) {
    if (Math.abs(nums[low]) > Math.abs(nums[high])) {
      answer.unshift(nums[low] * nums[low++]);
      continue;
    }

    if (Math.abs(nums[high]) > Math.abs(nums[low])) {
      answer.unshift(nums[high] * nums[high--]);
      continue;
    }

    if (low === high) {
      answer.unshift(nums[high] * nums[high--]);
      continue;
    }

    answer.unshift(nums[low] * nums[low++]);
  }

  return answer;
}

function sortedSquaredArrayPointersNegPos(nums) {
  const answer = [];

  let positiveIndex = 0;

  while (nums[positiveIndex] < 0) {
    positiveIndex++;
  }

  let negativeIndex = positiveIndex - 1;

  while (true) {
    if (negativeIndex == -1 && positiveIndex == nums.length) {
      return answer;
    }

    if (negativeIndex == -1) {
      answer.push(nums[positiveIndex] * nums[positiveIndex++]);
      continue;
    }

    if (positiveIndex == nums.length) {
      answer.push(nums[negativeIndex] * nums[negativeIndex--]);
      continue;
    }

    if (Math.abs(nums[positiveIndex]) === Math.abs(nums[negativeIndex])) {
      answer.push(nums[negativeIndex] * nums[negativeIndex--]);
      answer.push(nums[positiveIndex] * nums[positiveIndex++]);
      continue;
    }

    if (Math.abs(nums[positiveIndex]) < Math.abs(nums[negativeIndex])) {
      answer.push(nums[positiveIndex] * nums[positiveIndex++]);
      continue;
    }

    answer.push(nums[negativeIndex] * nums[negativeIndex--]);
  }
}

function sortedSquaredArrayCheating(nums) {
  //O(n log n) to sort, O(n) to map = O(n log n)
  return nums.sort((a, b) => Math.abs(a) - Math.abs(b)).map(i => i * i);
}

console.log(sortedSquaredArrayCheating([-3, -1, 0, 2, 5, 10]));
console.log(sortedSquaredArrayPointersNegPos([-3, -1, 0, 2, 5, 10]));
console.log(sortedSquaredArrayPointersWhileLoop([-3, -1, 0, 2, 5, 10]));
console.log(sortedSquaredArrayPointersWhileLoop([-3, -1, 2, 5, 10]));
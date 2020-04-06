//https://www.youtube.com/watch?v=zoE9v3wrE_k
function findLongestChain(nums) {
  nums.sort((a, b) => a[1] - b[1]);
  let end = nums[0][1];
  let chainSize = 1;

  for (let i = 0; i < nums.length; i++) {
    if (end < nums[i][0]) {
      chainSize++;
      end = nums[i][1];
    }
  }

  return chainSize;
}

console.log(findLongestChain([[1, 2,], [2, 3], [3, 4]]));
console.log(findLongestChain([[1, 99,], [2, 3], [4, 5], [6, 8], [8,9] ]));
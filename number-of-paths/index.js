//  https://www.pramp.com/challenge/N5LYMbYzyOtbpovQoY7X

function numOfPathsToDest(n) {
  if (n === 0) {
    return 0;
  }

  if (n <= 2) {
    return 1;
  }

  //O(n*n) space
  const dp = Array(n).fill().map(i => Array(n).fill(0));
  dp[0][0] = 1;

  //O(n*n)
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      if (y > x) {
        continue;
      }

      if (y == 0) { //optimize this later to acount or half
        dp[x][y] = 1;
        continue;
      }

      dp[x][y] = dp[x - 1][y] + dp[x][y - 1];
    }
  }

  return dp[n - 1][n - 1];
}

console.log(numOfPathsToDest(0)); //0
console.log(numOfPathsToDest(1)); //1
console.log(numOfPathsToDest(2)); //1
console.log(numOfPathsToDest(3)); //2
console.log(numOfPathsToDest(4)); //5
console.log(numOfPathsToDest(5)); //14
console.log(numOfPathsToDest(6)); // 42
console.log(numOfPathsToDest(17)); //35357670
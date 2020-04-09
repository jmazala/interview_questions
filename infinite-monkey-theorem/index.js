// https://www.youtube.com/watch?v=tOD6g7rF7NA&list=WL&index=13


//iterate on every prefix starting from pos in that favorite array
//recursively choose to take it, or not take it
//-1 means not possible
//check 0 would be entire string
function minimumSpaces(s, favoriteWords) {
  const N = s.length;
  const wordsSet = new Set(favoriteWords);
  const dp = Array(N).fill(-2);

  return check(0) - 1;

  function check(pos) {
    if (pos === N) { //base case, nothing left
      return 0;
    }

    if (dp[pos] !== -2) {
      return dp[pos];
    }

    let answer = Number.MAX_SAFE_INTEGER;

    let prefix = '';
    for (let i = pos; i < N; i++) {
      prefix += s[i];

      if (wordsSet.has(prefix)) {
        const other = check(i + 1); //try to split after position j.  means take this one.
        if (other > -1) {
          answer = Math.min(answer, 1 + other);
        }
      }
    }

    answer = (answer === Number.MAX_SAFE_INTEGER) ? -1 : answer;
    dp[pos] = answer;

    return answer;
  }
}

const input = '3141592653589793238462643383279';
const favNumbers = ['314', '49', '9001', '15926535897', '14', '9323', '8462643383279', '4', '793'];
console.log(minimumSpaces(input, favNumbers)); //3

const input2 = '123456789';
const favNumbers2 = ['1', '234', '1234', '56789', '9', '123456789'];
console.log(minimumSpaces(input2, favNumbers2)); //0
//sample output:
//3 .  least number of spaces added to match most number of favorites
// (314 15926535897 9323 8462643383279)
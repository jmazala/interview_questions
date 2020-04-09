//https://www.youtube.com/watch?v=4UWDyJq8jZg&list=WL&index=2
//list of people with birth years and death years
//find the year with highest population
/**
 * 
 * @param {int[][]} people 
 */
//dp
function findMostAliveDP(people) {
  if (!people) {
    return -1;
  }

  //put births and deaths on a number line
  const yearHash = {};

  //keep track of minYear and maxYear
  //so we know the beginning and end of our number line
  let maxYear = Number.MIN_SAFE_INTEGER;
  let minYear = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < people.length; i++) {
    const [birth, death] = people[i];
    yearHash[birth] = yearHash[birth] || 0;
    yearHash[birth]++;
    //they lived the entire year and died on the last day so it counts
    yearHash[death + 1] = yearHash[death + 1] || 0;
    yearHash[death + 1]--;
    maxYear = Math.max(maxYear, people[i][1]);
    minYear = Math.min(minYear, people[i][0]);
  }

  //dp array going to be number alive in that year
  //go through people array, sorted by birth year asc and add 1 for the birth and subtract 1 for death
  const OFFSET = minYear - 1;
  const dp = Array(maxYear - minYear + 2).fill(0);
  let maxPeople = 0;
  let answer;
  dp[0] = 0;
  //walk the number line and increment for a birth and decrement for a death
  for (let i = minYear; i <= maxYear; i++) {
    dp[i - OFFSET] += dp[i - OFFSET - 1];
    if (yearHash[i]) {
      dp[i - OFFSET] += yearHash[i];
    }

    if (dp[i - OFFSET] > maxPeople) {
      answer = i;
      maxPeople = dp[i - OFFSET];
    }
  }

  return answer;
}
//brute force
function findMostAliveBruteForce(people) {
  const hash = {};
  let max = Number.MIN_SAFE_INTEGER;
  let year = 0;

  for (let i = 0; i < people.length; i++) {
    let [birthYear, deathYear] = people[i];

    while (birthYear < deathYear) {
      hash[birthYear] = hash[birthYear] || 0;
      hash[birthYear]++;

      if (hash[birthYear] > max) {
        max = hash[birthYear];
        year = birthYear;
      }
      birthYear++;
    }
  }

  return year;
}

console.log(findMostAliveBruteForce([
  [1960, 2000],
  [1965, 2000],
  [1914, 1992],
  [1991, 2001],
]))

console.log(findMostAliveDP([
  [1960, 2000],
  [1965, 2000],
  [1914, 1992],
  [1991, 2001],
]));
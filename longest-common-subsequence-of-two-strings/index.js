//https://www.youtube.com/watch?v=10WnvBk9sZc&list=RDCMUCNc-Wa_ZNBAGzFkYbAHw9eg&index=4
// const _ = require('lodash');

//return a string
// function fasterLongestCommonSubsequence(s1, s2) {
//   const subsequences = [];
//   if (s1.length > s2.length) {
//     findAllSubsequences(s2, '', subsequences);
//     return matchSubsequence(s1, '', subsequences);
//   }

//   findAllSubsequences(s1, '', subsequences);
//   return matchSubsequence(s2, '', subsequences);
// }

function longestCommonSubsequence(s1, s2) {
  //filter out irrelevant characters
  s1 = Array.from(s1).filter(s1Char => s2.indexOf(s1Char) > -1).join(''); //O(n1 * n2)
  s2 = Array.from(s2).filter(s2Char => s1.indexOf(s2Char) > -1).join(''); //O(n2 * n1)

  if (s1.length > s2.length && s1.indexOf(s2) > -1) { //O(1)
    return s2;
  }

  if (s2.length > s1.length && s2.indexOf(s1) > -1) { //O(1)
    return s1;
  }

  if (s1 === s2) { //O(1)
    return s1;
  }

  subsequences1 = [];
  findAllSubsequences(s1, '', subsequences1); //O(n1^2)
  subsequences2 = [];
  findAllSubsequences(s2, '', subsequences2); //O(n2^2)

  //DOING UNION OURSELVES
  const union = subsequences1.filter(i => subsequences2.indexOf(i) > -1); //O(n1 * n2)
  union.sort((a, b) => b.length - a.length); //O(n log n)
  return union[0]; //O(1)

  //USING LODASH TO UNION
  // return _.union(subsequences1, subsequences2).sort((a, b) => {
  //   return b.length - a.length;
  // })[0];
}

// function matchSubsequence(s, prefix, matchArray, match = '') {
//   if (!s) {
//     if (matchArray.indexOf(prefix) > -1) {
//       return prefix.length > match.length ? prefix : match;
//     }

//     return '';
//   }

//   return matchSubsequence(s.slice(1), prefix + s[0], matchArray) || matchSubsequence(s.slice(1), prefix, matchArray);
// }

function findAllSubsequences(s, prefix, subsequences, memo = {}) {
  if (!s) {
    subsequences.push(prefix);
    return;
  }

  //simulate taking first char
  findAllSubsequences(s.slice(1), prefix + s[0], subsequences);

  //simulate not taking first char
  findAllSubsequences(s.slice(1), prefix, subsequences);
}

//most naive is i would take every subsequence in s1, every subsequence in s2, return their union, sort by length of string, and return that

/*
longest sequence of characters such all of them appear in both strings
possibly with characters in between
can delete characters, but order has to be the same

"ABAZDC", "BACBAD" => "ABAD"
"AGGTAB", "GXTXAYB" => "GTAB"
"aaaa", "aa", => "aa"
*/

console.log(longestCommonSubsequence('ABAZDC', 'BACBAD'));
console.log(longestCommonSubsequence('AGGTAB', 'GXTXAYB'));
// console.log(longestCommonSubsequence('aaaa', 'aa'));
// console.log(fasterLongestCommonSubsequence('ABAZDC', 'BACBAD'));
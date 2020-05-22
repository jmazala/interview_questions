//https://start.interviewing.io/feedback/tIE1HyPSYovX

const objSize = o => Object.keys(o).length;

function findLongestSubstringOfKDistinct(string, k) {
  if (k === 0 || string.length === 0) {
    return '';
  }
  
  const charCounts = {};
  const current = [];
  let answer = [];

  //add the character to the hash
  //if we've exceeded k, adjust sliding window
  //delete that previous char from the hash at the end

  for (let i = 0; i < string.length; i++) {
    const c = string[i];
    charCounts[c] = charCounts[c] || 0;
    charCounts[c]++;
    current.push(c);

    //adjust our sliding window if we've exceeded k chars
    while (objSize(charCounts) > k) {
      const removedChar = current.shift();
      charCounts[removedChar]--;
      if (charCounts[removedChar] === 0) {
        delete charCounts[removedChar];
      }
    }

    if (current.length > answer.length) {
      answer = current.slice();
    }
  }

  return answer.join('');
}

//BRUTE FORCE NAIVE
// function findLongestSubstringOfKDistinct(string, k) {
//   //brute force approach 
//   let answer = '';
//   for (let i = 0; i < string.length; i++) {
//     const current = helper(i);
//     if (current.length > answer.length) {
//       answer = current;
//     }
//   }

//   return answer;

//   function helper(i) {
//     let longest = '';
//     let set = new Set();
//     while (i < string.length) {
//       const c = string[i++];
//       set.add(c);
//       if (set.size > k) {
//         return longest;
//       }

//       longest += c;
//     }

//     if (set.size === k) {
//       return longest;
//     }

//     return '';
//   }
// }

console.log(findLongestSubstringOfKDistinct('abbaaabddccdddcgge', 0)); // ''
console.log(findLongestSubstringOfKDistinct('abbaaabddccdddcgge', 1)); // 'aaa' or 'ddd'
console.log(findLongestSubstringOfKDistinct('abbaaabddccdddcgge', 2)); // 'ddccdddc'
console.log(findLongestSubstringOfKDistinct('abbaaabddccdddcgge', 3)); // 'ddccdddcgg'

/*

abbbddcccggee --> k =
give me longest substring (anyone, can be many) with exactly k distinct character

--> abbb --> 4
--> bbbdd --> 5
--> ddccc --> 5
--> cccgg --> 5
--> ggee --> 4
 */
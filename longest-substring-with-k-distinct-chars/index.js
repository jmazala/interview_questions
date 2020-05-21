//https://start.interviewing.io/feedback/tIE1HyPSYovX
function findLongestSubstringOfKDistinct(string, k) {
  if (k === 0 || !string) {
    return '';
  }
  
  const charCounts = {};
  let answer = '';
  let current = '';
  let left = 0;
  let right = 0;

  //add the character to the hash
  //if we've exceeded k, adjust sliding window
  //delete that previous char from the hash at the end

  while (right < string.length) {
    const c = string[right];
    charCounts[c] = charCounts[c] || 0;
    charCounts[c]++;

    //adjust our sliding window if we've exceeded k chars
    if (Object.keys(charCounts).length > k) {
      if (current.length > answer.length) {
        answer = current;
      }

      const originalLeftChar = string[left];
      while (charCounts[originalLeftChar] > 0) {
        const leftChar = string[left];
        charCounts[leftChar]--;
        left++;
        current = current.slice(1);
      }

      // {'b': 1, 'd': 1 }
      delete charCounts[originalLeftChar];
    }

    current += c;
    right++;
  }

  return answer;
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




console.log(findLongestSubstringOfKDistinct('abbaaabddccdddcgge', 0));
console.log(findLongestSubstringOfKDistinct('abbaaabddccdddcgge', 1));
console.log(findLongestSubstringOfKDistinct('abbaaabddccdddcgge', 2));
console.log(findLongestSubstringOfKDistinct('abbaaabddccdddcgge', 3));




/*

abbbddcccggee --> k =
give me longest substring (anyone, can be many) with exactly k distinct character

--> abbb --> 4
--> bbbdd --> 5
--> ddccc --> 5
--> cccgg --> 5
--> ggee --> 4
 */
//https://www.youtube.com/watch?v=QGVCnjXmrNg
function findAllConcatenatedWords(words) {
  const wordsSet = new Set(words);//SPACE O(n)
  const cache = {};  //SPACE O(n)

  return words.filter(word => { //TIME O(n)
    return canForm(word, wordsSet, cache);
  });
}

function canForm(word, wordsSet, cache) {
  if (cache[word]) { //O(1)
    return cache[word];
  }

  for (let i = 1; i < word.length; i++) { //O(m)
    prefix = word.slice(0, i);
    suffix = word.slice(i);
    if (wordsSet.has(prefix)) { //O(1)
      if (wordsSet.has(suffix) || canForm(suffix, wordsSet, cache)) {
        cache[word] = true;
        return true;
      }
    }
  }

  return false;
}

words = ['cat', 'cats', 'dog', 'catsdog'];;
console.log(findAllConcatenatedWords(words)); //['catsdog']


// //you are given an array of words and you ened to find which of these words can possilby be a concatentation of the other words

// function findConcatenationsWithBruteForce(words) {
//   //   //sort words by length ASC
//   words.sort((a, b) => a.length - b.length);
//   const longestLength = words[words.length - 1].length;
//   const answer = [];

//   findConcatenations(0, '', 0);
//   for (let i = 0; i < words.length; i++) {
//     findConcatenations(i + 1, words[i], 1);
//   }

//   return answer;

//   function findConcatenations(index, prefix, numWords) {
//     if (index >= words.length || prefix.length > longestLength) {
//       return;
//     }

//     if (numWords > 1 && words.indexOf(prefix) > -1) {
//       answer.push(prefix);
//     }

//     //simulate taking current word
//     findConcatenations(index + 1, prefix + words[index], numWords + 1);
//     //simulate not taking current word
//     findConcatenations(index + 1, prefix, numWords + 1);
//   }
// }

// // function findConcatenations(words) {
// //   //sort words by length ASC
// //   words.sort((a, b) => a.length - b.length);
// //   const longestLength = words[words.length - 1].length;

// //   const answer = []

// //   // for (let i = words.length; i >= 0; i--) {
// //   //   if (words[i].length === words[0].length) {
// //   //     continue;
// //   //   }

// //   //   findConcatenations(words[i]);
// //   // }

// //   findConcatenations();

// //   return words;

// //   function findConcatenations(index=0, prefix='') {
// //     if (prefix === target) {
// //       return;
// //     }

// //     for (let i = index; )
// //   }
// // }

// words = ['cat', 'cats', 'dog', 'catsdog'];
// console.log(findConcatenationsWithBruteForce(words));
// // console.log(findConcatenations(words)); //['catsdog']
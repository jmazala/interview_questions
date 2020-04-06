//https://www.youtube.com/watch?v=aotBpjJUqJo&t=1800s
//example is an array of chars like perfect makes practice.
//turn it into practice makes perfect

// function reverseWordsInArray(arr) {
//   reversedSentence = arr.join('').split(' ');
//   s = ""
//   for (let i = reversedSentence.length - 1; i >= 0; i--) {
//     s += reversedSentence[i] + ' ';
//   }

//   return s.slice(0, -1);
// }

function reverseWordsInArray(arr) {
  reverse(0, arr.length - 1);

  let start = 0;
  let end = start;

  while (end < arr.length - 1) {
    while (end < arr.length && arr[end] !== ' ') {
      end++;
    }

    reverse(start, end - 1);
    start = end + 1;
    end = start;
  }

  return arr;

  function reverse(start, end) {
    for (let i = start; i < Math.round((start + end) / 2); i++) {
      const temp = arr[i];
      arr[i] = arr[end - start - i];
      arr[end - i] = temp;
    }
  }
}

reverseWordsInArray(Array.from("perfect makes practice"))
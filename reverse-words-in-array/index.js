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

  return arr.join('');

  function reverse(start, end) {
    for (let i = 0; i < Math.round((end - start)) / 2; i++) {
      const temp = arr[start + i];
      arr[start + i] = arr[end - i];
      arr[end - i] = temp;
    }
  }
}

console.log(reverseWordsInArray(Array.from("perfect makes practice")));
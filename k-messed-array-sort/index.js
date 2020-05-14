//https://www.pramp.com/challenge/XdMZJgZoAnFXqwjJwnBZ

//using swaps to sort in place is O(n) * O(k) = O(nk)
function sortKMessedArray(arr, k) {
  if (arr.length < 2 || k == 0) {
    return arr;
  }

  //at position 0 that element can either be 0, 1, ... k
  for (let i = 0; i < arr.length; i++) {
    let swapIndex = i;
    let currentMin = arr[i];

    for (let j = i + 1; j <= Math.min(arr.length, (i + k)); j++) {
      if (arr[j] < currentMin) {
        swapIndex = j;
        currentMin = arr[j];
      }
    }

    const temp = arr[i];
    arr[i] = arr[swapIndex];
    arr[swapIndex] = temp;
  }

  return arr;
}

const arr = [1, 4, 5, 2, 3, 7, 8, 6, 10, 9];
const k = 2;
console.log(JSON.stringify(sortKMessedArray(arr, k)));
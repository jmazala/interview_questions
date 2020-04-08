//first input is an array
//second input is the same as the first array but missing 1 thing
function find_missing(arr1, arr2) {
  let sum = 0;
  arr1.forEach(i => sum += i);
  arr2.forEach(i => sum -= i);
  return sum;
}

function find_missing_xor(arr1, arr2) {
  let answer = 0;
  arr1.forEach(i => answer ^= i);
  arr2.forEach(i => answer ^= i);
  return answer;
}

console.log(find_missing([1,2,3], [1,2])); //3
console.log(find_missing_xor([1,2,3], [1,2])); //3
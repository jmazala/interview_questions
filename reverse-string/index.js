function reverseString(s) {
  s = Array.from(s);
  for (let i = 0; i < Math.round(s.length / 2); i++) {
    const temp = s[i];
    s[i] = s[s.length - 1 - i];
    s[s.length - i - 1] = temp;
  }

  return s.join('');
}

console.log(reverseString(''));
console.log(reverseString('a'));
console.log(reverseString('ab'));
console.log(reverseString('abc'));
console.log(reverseString('abcd'));
console.log(reverseString('abcde'));
console.log(reverseString('abcdef'));
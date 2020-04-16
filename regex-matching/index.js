//RECURSIVELY
function isMatch(string, regex) {
  if (regex === '.*') {
    return true;
  }
  if (!regex) {
    return !string;
  }

  const firstMatch = string.length > 0 && (regex[0] === string[0] || regex[0] === '.');

  if (regex.length >= 2 && regex[1] === '*') {
    return (isMatch(string, regex.slice(2))) || //disregard it entirely
      (firstMatch && isMatch(string.slice(1), regex));
  }

  return firstMatch && isMatch(string.slice(1), regex.slice(1));
}

//ITERATIVELY
// function isMatch(string, regex) {
//   if (regex === '.*') {
//     return true;
//   }

//   if (!string) {
//     return !regex ||
//       regex === '.' ||
//       (regex.length === 2 && regex[1] === '*');
//   }

//   string = Array.from(string);
//   regex = Array.from(regex);

//   let currentR;
//   let currentS;

//   while (string.length > 0 || regex.length > 0) {
//     currentS = string.shift();
//     currentR = regex.shift();

//     //letter, no *
//     if (isLetter(currentR) && regex[0] !== '*') {
//       if (currentS !== currentR) {
//         return false;
//       }

//       continue;
//     }

//     //dot, no *
//     else if (isDot(currentR) && regex[0] !== '*') {
//       continue; //burn a char
//     }

//     //letter, with *
//     else if (isLetter(currentR) && regex[0] === '*') {
//       regex.shift(); //eliminate the next *
//       while (currentS === currentR) {
//         currentS = string.shift(); //keep looking for this character until you can't
//       }

//       if (!currentS) {
//         continue;
//       }

//       string.unshift(currentS); //put it back
//       continue;
//     }

//     //dot, with *
//     else if (isDot(currentR) && regex[0] === '*') {
//       regex.shift(); //eliminate the *
//       while (currentS && currentS !== regex[0]) { //move forward until the next char is seen
//         currentS = string.shift();
//       }

//       string.unshift(currentS) //put it back;
//       continue;
//     }
//   }

//   return true;
// }

// function isLetter(c) {
//   return /[A-Za-z]/.test(c);
// }

// function isDot(c) {
//   return c === '.';
// }

// console.log(isMatch('aa', 'a')); //false
// console.log(isMatch('aab', 'c*a*b')); // true
// console.log(isMatch('ab', '.*')); // true
// console.log(isMatch('aa', 'a*b*c*')); //true
// console.log(isMatch('mississippi', 'mis*is*p*.')); //false
// console.log(isMatch('ab', '.*c')); // false
console.log(isMatch('aaa', 'a*a')); //true
//https://www.pramp.com/challenge/MW75pP53wAtzNPVLPG0d

function shortestWordEditPath(source, target, words) {
	/**
	@param source: string
	@param target: string
	@param words: string[]
	@return: integer
	*/

  if (source.length !== target.length || words.length === 0) {
    return -1;
  }

  if (source === target) {
    return 0;
  }

  const set = new Set(words);

  //O(k) k = words.length
  if (!set.has(target)) {
    return -1;
  }

  const queue = [source];
  let steps = 0;

  while (queue.length) {
    let numNextWords = queue.length;
    steps++;

    while (numNextWords) {
      const currentWord = queue.shift();
      set.delete(currentWord);

      numNextWords--;
      if (currentWord === target) {
        return steps - 1;
      }

      //how to add more children to the queue
      for (nextWord of set) {
        //if this is an eligible next word push it to the queue
        if (isEligible(currentWord, nextWord)) {
          queue.push(nextWord);
        }
      }
    }
  }

  return -1;
}

//return true if next word has 1 letter distance
function isEligible(currentWord, nextWord) {
  if (nextWord === currentWord) {
    return false;
  }

  let distance = 0;
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] !== nextWord[i]) {
      distance++;
      if (distance > 1) {
        return false;
      }
    }
  }

  return true;
}

console.log(shortestWordEditPath('bit', 'dog', ["but", "put", "big", "pot", "pog", "dog", "lot"])); //5
console.log(shortestWordEditPath('bit', 'dog', ["but", "put", "big", "pot", "dog", "lot"])); //5
#//https://www.youtube.com/watch?v=QGVCnjXmrNg
from typing import List

class TrieNode:
  def __init__(self, isWord: bool, children: dict):
    self.isWord = isWord
    self.children = children

class Solution:
  def __init__(self):
    self.trie = None
  
  def buildTrie(self, words: List[str]) -> None:
    self.trie = TrieNode(False, {})
    
    for word in words:
      current = self.trie
      for char in word:
        if (char not in current.children):
          current.children[char] = TrieNode(False, {})
        
        current = current.children[char]
      
      current.isWord = True
  
  def dfs(self, node: TrieNode, prefix: str) -> List[str]:
    words = []
    if (node.isWord):
      words.append(prefix)
    
    for nextChar in node.children: #iterates through keys in hash
      words += self.dfs(node.children[nextChar], prefix + nextChar)

    return words
    
  def autocomplete(self, prefix: str) -> List[str]:
    current = self.trie
    for char in prefix:
      if (char not in current.children):
        return []
      current = current.children[char]
    
    return self.dfs(current, prefix)
      
if __name__ == '__main__':
  s = Solution()
  s.buildTrie(["dog", "dark", "cat", "door", "dodge"])
  print(s.autocomplete("do"))
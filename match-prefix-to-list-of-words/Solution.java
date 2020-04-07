//https://www.youtube.com/watch?v=QGVCnjXmrNg
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//say lowercase letters only
class TrieNode {
  HashMap<Character, TrieNode> children; // could do this with finite 26 char int array too
  boolean isWord;

  public TrieNode(HashMap<Character, TrieNode> children, boolean isWord) {
    this.children = children;
    this.isWord = isWord; // true if it represents the end of a word
  }
}

class Solution {
  TrieNode trie;

  public void buildTrie(String[] words) {
    // build the trie
    this.trie = new TrieNode(new HashMap<Character, TrieNode>(), false);
    TrieNode current;

    for (String word : words) {
      current = this.trie;

      for (Character c : word.toCharArray()) {
        if (!current.children.containsKey(c)) {
          current.children.put(c, new TrieNode(new HashMap<Character, TrieNode>(), false));
        }

        current = current.children.get(c);
      }

      current.isWord = true;
    }
  }

  public List<String> autocomplete(String[] words, String prefix) {
    List<String> answer = new ArrayList<>();
    if (prefix.length() == 0) {
      return answer;
    }

    // build your trie, space complexity is O(n) for the trie
    buildTrie(words);

    // iterate trie for entireity of prefix, O(k)
    TrieNode current = trie;
    for (Character c : prefix.toCharArray()) {
      if (!current.children.containsKey(c)) {
        return answer;
      }

      current = current.children.get(c);
    }

    // then run DFS from there to get all potential words. it's max O(n) if every
    // word matches prefix
    return findWordsFromNode(current, prefix);
  }

  private List<String> findWordsFromNode(TrieNode node, String prefix) {
    List<String> words = new ArrayList<>();
    if (node.isWord) {
      words.add(prefix);
    }

    // for (Map.Entry<String, List<String>> entry : map.entrySet()) {
    for (Map.Entry<Character, TrieNode> nextNodeEntry : node.children.entrySet()) {
      Character nextChar = nextNodeEntry.getKey();
      TrieNode nextNode = nextNodeEntry.getValue();
      words.addAll(findWordsFromNode(nextNode, prefix + nextChar));
    }

    return words;
  }

  // O(k + n) where k is length of prefix and n is # of words in array
  public static List<String> matchPrefixToWords(String[] words, String prefix) {
    List<String> answer = new ArrayList<>();
    for (String word : words) {
      if (word.startsWith(prefix, 0)) {
        answer.add(word);
      }
    }

    return answer;
  }

  public static void main(String[] args) {
    System.out.println(Solution.matchPrefixToWords(new String[] { "dog", "dark", "cat", "door", "dodge" }, "do"));
    Solution s = new Solution();
    System.out.println(s.autocomplete(new String[] { "dog", "dark", "cat", "door", "dodge" }, "do"));
  }
}
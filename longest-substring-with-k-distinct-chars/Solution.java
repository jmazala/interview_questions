import java.util.*;

class Solution {

  // SLIDING WINDOW
  public static String findLongestSubstringOfKDistinct(String string, int k) {
    if (string.length() == 0 || k == 0) {
      return "";
    }

    Map<Character, Integer> charCounts = new HashMap<>();
    List<Character> current = new ArrayList<>();
    List<Character> longest = new ArrayList<>();

    for (char c : string.toCharArray()) {
      current.add(c);
      charCounts.put(c, charCounts.getOrDefault(c, 0) + 1);

      //we need exactly k distinct characters, not up to k
      if (charCounts.size() < k) {
        continue;
      }

      while (charCounts.size() > k) {
        char removed = current.remove(0);
        int count = charCounts.get(removed) - 1;

        if (count == 0) {
          charCounts.remove(removed);
        } else {
          charCounts.put(removed, count);
        }
      }

      if (current.size() > longest.size()) {
        longest = new ArrayList<Character>(current);
      }
    }

    StringBuilder builder = new StringBuilder();
    for (char c : longest) {
      builder.append(c);
    }

    return builder.toString();
  }

  public static void main(String[] args) {
    System.out.println(Solution.findLongestSubstringOfKDistinct("abbaaabddccdddcgge", 0)); // ''
    System.out.println(Solution.findLongestSubstringOfKDistinct("abbaaabddccdddcgge", 1)); // 'aaa' or 'ddd'
    System.out.println(Solution.findLongestSubstringOfKDistinct("abbaaabddccdddcgge", 2)); // 'ddccdddc'
    System.out.println(Solution.findLongestSubstringOfKDistinct("abbaaabddccdddcgge", 3)); // 'ddccdddcgg'
    System.out.println(Solution.findLongestSubstringOfKDistinct("aaa", 2)); // ''
  }
}
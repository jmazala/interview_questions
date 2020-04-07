import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;

// https://www.youtube.com/watch?v=yeCsuIk9vp0&list=RDCMUCNc-Wa_ZNBAGzFkYbAHw9eg&index=5
class Solution {
  public static int findNonRepeatedElementWithASet(int[] arr) {
    Set<Integer> set = new HashSet<>();

    for (int num : arr) {
      if (set.contains(num)) {
        set.remove(num);
      } else {
        set.add(num);
      }
    }

    return (Integer) set.toArray()[0];
  }

  public static int findNonRepeatedElementWithXor(int[] arr) {
    // xor every number with answer;
    int answer = 0;

    for (int num : arr) {
      answer ^= num;
    }

    return answer;

  }

  public static void printPairsWhosSumIsN(int[] arr, int n) {
    Set<Integer> hashToNothing = new HashSet<>(); // SPACE O(n)

    for (int num : arr) { // TIME O(n)
      if (hashToNothing.contains(n - num)) {
        System.out.println(String.format("[%d, %d]", n - num, num)); // IDK HOPEFULLY FAST
        hashToNothing.remove(num);
        hashToNothing.remove(n - num);
      } else {
        hashToNothing.add(num);
      }
    }

    return;
  }

  // given an array of integers find the most frequent integer
  public static Integer warmUp(int[] arr) {
    if (arr == null || arr.length == 0) {
      return null; // do something
    }

    Map<Integer, Integer> counts = new HashMap<>();
    int maxCount = 0;
    Integer answer = null;

    for (int num : arr) { // TIME: O(N)
      counts.put(num, counts.getOrDefault(num, 0) + 1); // SPACE O(N)
      // first time
      if (answer == null) {
        maxCount = 1;
        answer = num;
      } else if (counts.get(num) > maxCount) { // TIME O(1)
        maxCount = counts.get(num);
        answer = num;
      }
    }
    return answer;
  }

  public static void main(String[] args) {
    // System.out.println(Solution.warmUp(new int[] { 1, 1, 22, 2, 22, 2, 2, 2, 3,
    // 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5 }));
    // Solution.printPairsWhosSumIsN(new int[] {1,9,1,9}, 10);
    Solution.printPairsWhosSumIsN(new int[] { 1, 4, 5, 3, 9, -1, 10, 10, 4, 4, 4, 4, 50, 11 }, 8);
    System.out.println(Solution.findNonRepeatedElementWithXor(new int[] { 11, 22, 11, 22, 3, 3, 44 }));
    System.out.println(Solution.findNonRepeatedElementWithASet(new int[] { 11, 22, 11, 22, 3, 3, 44 }));
  }
}
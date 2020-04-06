//https://www.youtube.com/watch?v=D35llNtkCps&t=1726s
import java.util.PriorityQueue;

class Solution {
  //nth element in the list if it were sorted

  //find the smallest
  public static void warmUpProblem(int[] nums) {
    int smallest = Integer.MAX_VALUE;
    for (int num : nums) {
      if (num < smallest) {
        smallest = num;
      }
    }

    System.out.println("The smallest is " + smallest);
  }

  public static void findNthSmallestInSet(int[] nums, int k) {
    if (k > nums.length) {
      System.out.println("k is too big");
      return;
    }
    
    //sort descending, remove largest element if the pq is too big
    PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> {
      return b - a;
    });

    for (int num : nums) {
      pq.add(num);
      if (pq.size() > k) {
        pq.remove();
      }
    }
    int answer = pq.remove();

    // int answer = 0;

    // for (int i = 0; i < k; i++) {
    //   answer = pq.remove();
    // }

    System.out.println("The " + k + "th smallest element is " + answer);
  }
  public static void main(String[] args) {
    Solution.warmUpProblem(new int[] {4, 5, 1, 6}); // 1
    Solution.findNthSmallestInSet(new int[] {4, 5, 1, 6}, 1); // 4
    Solution.findNthSmallestInSet(new int[] {4, 5, 1, 6}, 2); // 4
    Solution.findNthSmallestInSet(new int[] {4, 5, 1, 6}, 3); // 4
    Solution.findNthSmallestInSet(new int[] {4, 5, 1, 6}, 4); // 4
    Solution.findNthSmallestInSet(new int[] {4, 5, 1, 6}, 5); // 4
  }
}

//https://www.youtube.com/watch?v=QGVCnjXmrNg
import java.util.PriorityQueue;

class Solution {

  public static Integer findKthLargestNumber(int[] nums, int k) {
    if (k == 0) {
      return null;
    }

    PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    for (int num : nums) {
      minHeap.add(num);
      if (minHeap.size() > k) {
        minHeap.remove();
      }
    }

    return minHeap.remove();
  }

  public static void main(String[] args) {
    int[] nums = { 5, 7, 2, 3, 4, 1, 6 };
    for (int i = 1; i < nums.length + 1; i++) {
      System.out.println(Solution.findKthLargestNumber(nums, i));
    }
  }
}
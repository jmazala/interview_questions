//https://www.youtube.com/watch?v=4eWKHLSRHPY&list=WL&index=13
import java.util.Arrays;
import java.util.PriorityQueue;

//given an array of integers
//take that in our function, output an array of numbers sorted
//that array that we output has to be the squares of all inputs in the element array

public class Solution {
  // using 2 pointers to traverse array
  public static int[] sortedSquaredArray(int[] nums) {
    if (nums == null || nums.length == 0) {
      return new int[] {};
    }

    int[] answer = new int[nums.length];
    // if we have a 0 add it to answer
    int positiveIndex = 0;
    int negativeIndex = 0;
    int answerIndex = 0;

    // find first positive number, stick positive index there
    while (nums[positiveIndex] < 0) {
      positiveIndex++;
    }

    negativeIndex = positiveIndex - 1;

    while (true) {
      if (negativeIndex <= 0 && positiveIndex >= nums.length) {
        return answer;
      }

      if (negativeIndex < 0) {
        answer[answerIndex++] = nums[positiveIndex] * nums[positiveIndex++];
        continue;
      }

      if (positiveIndex >= nums.length) {
        answer[answerIndex++] = nums[negativeIndex] * nums[negativeIndex--];
        continue;
      }

      if (Math.abs(nums[negativeIndex]) == Math.abs(nums[positiveIndex])) {
        answer[answerIndex++] = nums[negativeIndex] * nums[negativeIndex--];
        answer[answerIndex++] = nums[positiveIndex] * nums[positiveIndex++];
        continue;
      }

      if (Math.abs(nums[negativeIndex]) < Math.abs(nums[positiveIndex])) {
        answer[answerIndex++] = nums[negativeIndex] * nums[negativeIndex--];
        continue;
      }

      answer[answerIndex++] = nums[positiveIndex] * nums[positiveIndex++];
    }
  }

  // using heap
  public static int[] sortedSquaredArrayHeap(int[] nums) {
    int[] answer = new int[nums.length];
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int num : nums) {
      minHeap.add(num * num);
    }

    for (int i = 0; i < answer.length; i++) {
      answer[i] = minHeap.remove();
    }
    return answer;
  }

  public static void main(String[] args) {
    System.out.println(Arrays.toString(Solution.sortedSquaredArray(new int[] { -3, -1, 0, 2, 5, 10 })));
    System.out.println(Arrays.toString(Solution.sortedSquaredArrayHeap(new int[] { -3, -1, 0, 2, 5, 10, 11 })));
  }
}
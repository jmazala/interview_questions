
// https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=547645422524434
import java.io.*;
import java.util.*;
// Add any extra import statements you may need here

class Main {
  private int calculateMedian(PriorityQueue<Integer> heap1, PriorityQueue<Integer> heap2) {
    int size = heap1.size() + heap2.size();
    if (size % 2 == 1) {
      // middle integer in sorted order
      if (heap1.size() > heap2.size()) {
        return heap1.peek();
      } else {
        return heap2.peek();
      }
    } else { // median is average of 2 middle most integers
      return (heap2.peek() + heap1.peek()) / 2;
    }
  }

  int[] findMedian(int[] arr) {
    int[] output = new int[arr.length];
    int writeIndex = 0;
    int median;
    // output[i] = median of elements to the left

    PriorityQueue<Integer> leftHeap = new PriorityQueue<>((a, b) -> b - a);
    PriorityQueue<Integer> rightHeap = new PriorityQueue<>((a, b) -> a - b);
    leftHeap.add(arr[0]);
    median = calculateMedian(leftHeap, rightHeap);
    output[writeIndex++] = median;
    /*
     * minHeap: 5, 1 maxHeap: 3, 15 output: [5, 10, 5] median: 5
     */
    for (int i = 1; i < arr.length; i++) {
      if (arr[i] <= median) {
        leftHeap.add(arr[i]);
      } else {
        rightHeap.add(arr[i]);
      }

      if (leftHeap.size() - rightHeap.size() > 1) {
        rightHeap.add(leftHeap.remove());
      } else if (rightHeap.size() - leftHeap.size() > 1) {
        leftHeap.add(rightHeap.remove());
      }

      median = calculateMedian(leftHeap, rightHeap);
      output[writeIndex++] = median;
    }
    return output;
  }

  // These are the tests we use to determine if the solution is correct.
  // You can add your own at the bottom, but they are otherwise not editable!
  int test_case_number = 1;

  void check(int[] expected, int[] output) {
    int expected_size = expected.length;
    int output_size = output.length;
    boolean result = true;
    if (expected_size != output_size) {
      result = false;
    }
    for (int i = 0; i < Math.min(expected_size, output_size); i++) {
      result &= (output[i] == expected[i]);
    }
    char rightTick = '\u2713';
    char wrongTick = '\u2717';
    if (result) {
      System.out.println(rightTick + " Test #" + test_case_number);
    } else {
      System.out.print(wrongTick + " Test #" + test_case_number + ": Expected ");
      printIntegerArray(expected);
      System.out.print(" Your output: ");
      printIntegerArray(output);
      System.out.println();
    }
    test_case_number++;
  }

  void printIntegerArray(int[] arr) {
    int len = arr.length;
    System.out.print("[");
    for (int i = 0; i < len; i++) {
      if (i != 0) {
        System.out.print(", ");
      }
      System.out.print(arr[i]);
    }
    System.out.print("]");
  }

  public void run() {
    int[] arr_1 = { 5, 15, 1, 3 };
    int[] expected_1 = { 5, 10, 5, 4 };
    int[] output_1 = findMedian(arr_1);
    check(expected_1, output_1);

    int[] arr_2 = { 2, 4, 7, 1, 5, 3 };
    int[] expected_2 = { 2, 3, 4, 3, 4, 3 };
    int[] output_2 = findMedian(arr_2);
    check(expected_2, output_2);

    // Add your own test cases here

  }

  public static void main(String[] args) {
    new Main().run();
  }
}
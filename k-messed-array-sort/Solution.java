import java.io.*;
import java.util.*;

class Solution {

  // use a heap of size k+1
  static int[] sortKMessedArray(int[] arr, int k) {
    //O(K) time to allocate O(K) space for the heap
    PriorityQueue<Integer> minHeap = new PriorityQueue<>(k + 1);

    //O(N) space for the answer
    int[] answer = new int[arr.length];

    //O(1) space for the index
    int answerIndex = 0;

    /*
     * adding k+1 elements to the heap
     * O(log(K)) to insert to the heap.
     * all elements are added to the heap so that's O(N log(K))
     */
    for (int i = 0; i <= k; i++) {
      minHeap.add(arr[i]);
    }

    // remove min from the heap and insert next element from the array into the heap
    for (int i = k + 1; i < arr.length; i++) {
      //O(log(K)) to remove from the heap
      answer[answerIndex++] = minHeap.remove();
      minHeap.add(arr[i]);
    }

    // continue the process until both array and heap are exhausted
    while (!minHeap.isEmpty()) {
      answer[answerIndex++] = minHeap.remove();
    }

    return answer;
  }

  public static void main(String[] args) {
    int[] arr = { 1, 4, 5, 2, 3, 7, 8, 6, 10, 9 };
    int k = 2;
    System.out.println(Arrays.toString(sortKMessedArray(arr, k)));
  }
}
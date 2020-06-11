import java.io.*;
import java.util.*;
// Add any extra import statements you may need here

class Main {

  class QueueItem {
    int value;
    int originalIndex;

    public QueueItem(int value, int originalIndex) {
      this.value = value;
      this.originalIndex = originalIndex;
    }
  }

  int[] findPositions(int[] arr, int x) {
    int[] output = new int[x];
    int writeIndex = 0;

    Queue<QueueItem> queue = new LinkedList<>();
    for (int i = 0; i < arr.length; i++) {
      queue.add(new QueueItem(arr[i], i + 1)); // i + 1 because they are 1-indexed
    }

    // perform x iterations of the 3 step process
    for (int i = 0; i < x; i++) {
      Queue<QueueItem> subQueue = new LinkedList<>();
      QueueItem maxQueueItem = queue.peek();

      // pop x elements from the front of the queue
      int queueSize = queue.size();
      for (int j = 0; j < Math.min(queueSize, x); j++) {
        QueueItem cur = queue.remove();

        // keep track of the one with the largest value
        if (cur.value > maxQueueItem.value) {
          maxQueueItem = cur;
        }

        subQueue.add(cur);
      }

      while (!subQueue.isEmpty()) {
        QueueItem toAddBack = subQueue.remove();
        // for max item: don't add this back. add it to output array
        if (toAddBack.originalIndex == maxQueueItem.originalIndex) {
          output[writeIndex++] = toAddBack.originalIndex;
          continue;
        }

        toAddBack.value = Math.max(0, toAddBack.value - 1);
        queue.add(toAddBack);
      }
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
    int n_1 = 6;
    int x_1 = 5;
    int[] arr_1 = { 1, 2, 2, 3, 4, 5 };
    int[] expected_1 = { 5, 6, 4, 1, 2 };
    int[] output_1 = findPositions(arr_1, x_1);
    check(expected_1, output_1);

    int n_2 = 13;
    int x_2 = 4;
    int[] arr_2 = { 2, 4, 2, 4, 3, 1, 2, 2, 3, 4, 3, 4, 4 };
    int[] expected_2 = { 2, 5, 10, 13 };
    int[] output_2 = findPositions(arr_2, x_2);
    check(expected_2, output_2);

    int n_3 = 6;
    int[] arr_3 = { 1, 2, 2, 3, 4, 5 };
    int x_3 = 5;
    int[] expected_3 = { 5, 6, 4, 1, 2 };
    int[] output_3 = findPositions(arr_3, x_3);
    check(expected_3, output_3);

  }

  public static void main(String[] args) {
    new Main().run();
  }
}
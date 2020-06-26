
// https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=2444722699191194

import java.util.Arrays;
import java.util.PriorityQueue;

// Add any extra import statements you may need here

class Main {
  private static int[] ADJACENT = { -1, 1 };

  // Add any helper functions you may need here
  private int getAwkwardness(int[] attempt, PriorityQueue<Integer> shortestPeople, PriorityQueue<Integer> tallestPeople,
      int lastShortestIndex, int lastTallestIndex) {

    // 2 base cases: with an even number of people they'll both be empty
    if (shortestPeople.isEmpty() && tallestPeople.isEmpty()) {
      return calculate(attempt);
    }

    // with an odd # of people, there is 1 person left in shortest heap
    if (shortestPeople.size() == 1 && tallestPeople.isEmpty()) {
      int answer = -99; // IF YOU RETURN THIS, SOMETHING BROKE
      for (int i = 0; i < attempt.length; i++) {
        if (attempt[i] == 0) {
          int shortest = shortestPeople.remove();
          attempt[i] = shortest;
          // just putting -1 -1 because whatever
          answer = getAwkwardness(attempt, shortestPeople, tallestPeople, -1, -1);
          shortestPeople.add(shortest);
        }
      }

      return answer;
    }

    int awkwardness = Integer.MAX_VALUE;
    int tallest = tallestPeople.remove();
    int shortest = shortestPeople.remove();
    // place the tallest person on either side of the last tallest person
    for (int tallDelta : ADJACENT) {
      int nextTall = lastTallestIndex + tallDelta;
      if (nextTall < 0 || nextTall >= attempt.length || attempt[nextTall] > 0) {
        continue; // this seat is full
      }

      int[] nextAttempt = attempt.clone();
      nextAttempt[nextTall] = tallest;

      // place the shortest person on either side of the shortest person
      for (int shortDelta : ADJACENT) {
        int nextShort = lastShortestIndex + shortDelta;
        if (nextShort < 0 || nextShort >= attempt.length || nextAttempt[nextShort] > 0) {
          continue;
        }

        nextAttempt[nextShort] = shortest;
        awkwardness = Math.min(awkwardness,
            getAwkwardness(nextAttempt, shortestPeople, tallestPeople, nextShort, nextTall));
      }
    }

    shortestPeople.add(shortest);
    tallestPeople.add(tallest);
    return awkwardness;
  }

  private int calculate(int[] arrangement) {
    int awkwardness = Math.abs(arrangement[0] - arrangement[arrangement.length - 1]);
    for (int i = 0; i < arrangement.length - 1; i++) {
      awkwardness = Math.max(awkwardness, Math.abs(arrangement[i] - arrangement[i + 1]));
    }

    return awkwardness;
  }

  int minOverallAwkwardness(int[] arr) {
    Arrays.sort(arr);

    int i = 0;
    int j = arr.length - 1;
    PriorityQueue<Integer> shortestPeople = new PriorityQueue<>();
    PriorityQueue<Integer> tallestPeople = new PriorityQueue<>((a, b) -> b - a);

    while (i <= j) {
      // odd number of people, throw them in... shortest lol
      if (i == j) {
        shortestPeople.add(arr[i++]);
        continue;
      }

      shortestPeople.add(arr[i++]);
      tallestPeople.add(arr[j--]);
    }

    int minAwkwardness = Integer.MAX_VALUE;
    int[] seating = new int[arr.length];
    // shortest definitely goes at index 0 every time
    int shortest = shortestPeople.remove();
    seating[0] = shortest;

    // tallest can go at any non adjacent index
    int tallest = tallestPeople.remove();

    for (int tallestIndex = 2; tallestIndex < seating.length - 1; tallestIndex++) {
      int[] seatingAttempt = seating.clone();
      seatingAttempt[tallestIndex] = tallest;
      minAwkwardness = Math.min(minAwkwardness,
          getAwkwardness(seatingAttempt, shortestPeople, tallestPeople, 0, tallestIndex));
    }

    return minAwkwardness;
  }

  public void run() {
    int[] arr1 = { 5, 10, 6, 8 };
    System.out.println(minOverallAwkwardness(arr1)); // 4

    int[] arr2 = { 1, 2, 5, 3, 7 };
    System.out.println(minOverallAwkwardness(arr2)); // 4
  }

  public static void main(String[] args) {
    new Main().run();
  }
}
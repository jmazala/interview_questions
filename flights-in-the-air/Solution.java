import java.util.*;

class Flight {
  int start;
  int end;

  public Flight(int start, int end) {
    this.start = start;
    this.end = end;
  }
}

public class Solution {

  // using a Flight object (comparator example)
  public static int flightsInTheAir(List<Flight> flights) {
    if (flights.size() == 0) {
      return 0;
    }

    // flights.sort(new Comparator<Flight>() {
    // @Override
    // public int compare(Flight a, Flight b) {
    // return a.start - b.start;
    // }
    // });
    // flights.sort((a, b) -> a.start - b.start);
    PriorityQueue<Flight> minHeap = new PriorityQueue<>((a, b) -> a.end - b.end);

    int maxFlights = 0;

    for (Flight flight : flights) {
      while (!minHeap.isEmpty() && minHeap.peek().end <= flight.start) {
        minHeap.remove();
      }

      minHeap.add(flight);
      maxFlights = Math.max(maxFlights, minHeap.size());
    }

    return maxFlights;
  }

  // using int[] to store flight info
  public static int flightsInTheAir(int[][] flights) {
    if (flights.length == 0) {
      return 0;
    }

    // sort by start time asc
    Arrays.sort(flights, (a, b) -> a[0] - b[0]);

    // sort the heap by end time asc
    PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    int maxFlightsInTheAir = 0;

    for (int[] flight : flights) {
      int start = flight[0];

      while (!minHeap.isEmpty() && minHeap.peek()[1] <= start) {
        minHeap.remove();
      }

      minHeap.add(flight);
      maxFlightsInTheAir = Math.max(maxFlightsInTheAir, minHeap.size());
    }

    return maxFlightsInTheAir;
  }

  public static void main(String[] args) {
    int[][] arr1 = { { 2, 5 }, { 3, 7 }, { 8, 9 } };
    int[][] arr2 = { { 4, 8 }, { 2, 5 }, { 17, 20 }, { 9, 18 }, { 10, 21 } };
    System.out.println(Solution.flightsInTheAir(arr1)); // 2
    System.out.println(Solution.flightsInTheAir(arr2)); // 3

    List<Flight> list1 = new ArrayList<>();
    for (int[] flight : arr1) {
      list1.add(new Flight(flight[0], flight[1]));
    }

    List<Flight> list2 = new ArrayList<>();
    for (int[] flight : arr2) {
      list2.add(new Flight(flight[0], flight[1]));
    }

    System.out.println(Solution.flightsInTheAir(list1)); // 2
    System.out.println(Solution.flightsInTheAir(list2)); // 3
  }
}
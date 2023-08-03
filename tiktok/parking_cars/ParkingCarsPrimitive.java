import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

public class ParkingCarsPrimitive {

  private static int[] parkCars(int[] parkingSpots, int[][] adjacencies) {
    Set<String> visitedStates = new HashSet<>();
    Queue<int[]> queue = new LinkedList<>();
    int[] firstQueueItem = buildQueueItem(parkingSpots, getEmptySpot(parkingSpots));
    queue.add(firstQueueItem);
    visitedStates.add(getKey(firstQueueItem));

    while (!queue.isEmpty()) {
      int[] queueItem = queue.remove();
      int emptySpot = queueItem[queueItem.length - 1];

      for (int nextSpot : adjacencies[emptySpot]) {
        swap(queueItem, nextSpot, emptySpot);
        queueItem[queueItem.length - 1] = nextSpot;
        String key = getKey(queueItem);

        if (!visitedStates.contains(key)) {
          if (isSolved(queueItem)) {
            int[] returnedValue = new int[parkingSpots.length];
            for (int i = 0; i < parkingSpots.length; i++) {
              returnedValue[i] = queueItem[i];
            }

            return returnedValue;
          }

          visitedStates.add(key);
          queue.add(queueItem.clone());
        }

        swap(queueItem, nextSpot, emptySpot);
        queueItem[queueItem.length - 1] = emptySpot;
      }
    }

    return new int[] {}; // unsolveable
  }

  private static boolean isSolved(int[] array) {
    for (int i = 0; i < array.length - 2; i++) {
      if (array[i] != i) {
        return false;
      }
    }

    return true;
  }

  private static void swap(int[] array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  private static int[] buildQueueItem(int[] parkingSpots, int emptySpot) {
    int[] queueItem = new int[parkingSpots.length + 1];
    for (int i = 0; i < parkingSpots.length; i++) {
      queueItem[i] = parkingSpots[i];
    }

    queueItem[parkingSpots.length] = emptySpot;
    return queueItem;
  }

  private static String getKey(int[] parkingSpots) {
    return Arrays.toString(parkingSpots);
  }

  private static int getEmptySpot(int[] parkingSpots) {
    int emptySpot = -1;
    for (int i = 0; i < parkingSpots.length; i++) {
      if (parkingSpots[i] == -1) {
        emptySpot = i;
        break;
      }
    }

    return emptySpot;
  }

  public static void main(String[] args) {
    // yellow spot red car
    // red spot blue car
    // blue spot yellow car
    // gray spot empty
    int[] parkingSpots = new int[] { 1, 2, 0, -1 };
    int[][] adjacencies = new int[][] { { 1, 2, 3 }, { 0, 2, 3 }, { 0, 1, 3 }, { 0, 1, 2 } };

    System.out.println(Arrays.toString(parkCars(parkingSpots, adjacencies)));
  }
}

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class Point {
  int x;
  int y;
  double distanceToOrigin;

  public Point(int x, int y) {
    this.x = x;
    this.y = y;
  }

  public String toString() {
    return "[" + x + "," + y + "]";
  }
}

public class Solution {
  public static List<Point> findKClosestPoints(Point[] points, Point origin, int k) {
    List<Point> answer = new ArrayList<>();
    PriorityQueue<Point> maxHeap = new PriorityQueue<>(
        (a, b) -> Double.compare(b.distanceToOrigin, a.distanceToOrigin)); // I hope this is asc

    for (Point point : points) {
      point.distanceToOrigin = Solution.calculateDistance(origin, point);
      maxHeap.add(point);

      if (maxHeap.size() > k) {
        maxHeap.remove();
      }
    }

    answer.addAll(maxHeap);
    return answer;
  }

  private static double calculateDistance(Point origin, Point point) {
    return Math.sqrt(Math.pow(origin.x - point.x, 2) + Math.pow(origin.y - point.y, 2));
  }

  public static void main(String[] args) {
    System.out.println(Solution.findKClosestPoints(
        new Point[] { new Point(0, 1), new Point(1, -3), new Point(2, 4), new Point(1, 1), new Point(13, -2) },
        new Point(1, 1), 2));
  }
}
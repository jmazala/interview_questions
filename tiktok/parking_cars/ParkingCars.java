import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

/*
Question: A mini puzzle game
Move car to its color matched parking spots.
You can only move the car that is associated with unoccupied parking spots.
What you need to do is to write a solution to guide the player to reach the final state (solve the puzzle)
It is up to you to define how to guide the player, like you can print out something like "move red car"

Limitations: 
1. Each parking spot can have 0/1 car 
2. You can only move the car to the connected and unoccupied parking spot.
3. You can move only one car per step
 
Initial state: Cars are randomly parked in colored spots, 
Final state: A car needs to park in its color-matched spot.

Find a workable solution (including each step guide)
*/

public class ParkingCars {

  final static int YELLOW = 0;
  final static int RED = 1;
  final static int BLUE = 2;
  final static int GREY = -1;
  static boolean foundSolution = false;
  final static String DELIMITER = "=";

  static class GraphNode {
    int color;
    int occupant;
    public List<GraphNode> neighbors;

    public GraphNode(int color, int occupant, List<GraphNode> neighbors) {
      this.color = color;
      this.occupant = occupant;
      this.neighbors = neighbors;
    }

    public boolean isEmpty() {
      return this.occupant == GREY;
    }

    public void emptySpot() {
      this.occupant = GREY;
    }

    public void occupySpot(Integer carColor) {
      this.occupant = carColor;
    }

    public boolean isCorrect() {
      return this.occupant == this.color;
    }
  }

  static class QueueItem {
    List<GraphNode> currentArrangement;

    public QueueItem(List<GraphNode> currentArrangement) {
      this.currentArrangement = currentArrangement;
    }
  }

  public static void parkAllCarsDFS(List<GraphNode> parkingSpots) {
    dfs(parkingSpots, new HashSet<String>(), findEmptySpot(parkingSpots));
  }

  private static GraphNode findEmptySpot(List<GraphNode> parkingSpots) {
    for (int i = 0; i < parkingSpots.size(); i++) {
      if (parkingSpots.get(i).isEmpty()) {
        return parkingSpots.get(i);
      }
    }

    return null; // won't happen
  }

  public static List<GraphNode> parkAllCarsBFS(List<GraphNode> parkingSpots) {
    if (isSolved(parkingSpots)) {
      return parkingSpots;
    }

    Queue<QueueItem> queue = new LinkedList<>();
    Set<String> visited = new HashSet<>();
    visited.add(serializeState(parkingSpots));
    queue.add(new QueueItem(copyList(parkingSpots)));

    while (!queue.isEmpty()) {
      QueueItem item = queue.remove();
      // printGraph(item.currentArrangement);
      GraphNode freeSpot = findEmptySpot(item.currentArrangement);

      for (GraphNode nextSpot : freeSpot.neighbors) {
        freeSpot.occupySpot(nextSpot.occupant);
        nextSpot.emptySpot();
        // System.out.println("moving " + freeSpot.occupant);

        String nextState = serializeState(item.currentArrangement);
        if (!visited.contains(serializeState(item.currentArrangement))) {
          if (isSolved(item.currentArrangement)) {
            return item.currentArrangement;
          }

          visited.add(nextState);
          queue.add(new QueueItem(copyList(item.currentArrangement)));
        }

        nextSpot.occupySpot(freeSpot.occupant);
        freeSpot.emptySpot();
      }
    }

    return null;
  }

  private static void dfs(List<GraphNode> parkingSpots, Set<String> visited, GraphNode freeSpot) {
    if (foundSolution) {
      return;
    }

    visited.add(serializeState(parkingSpots));

    if (isSolved(parkingSpots)) {
      foundSolution = true;
      return;
    }

    for (GraphNode nextSpot : freeSpot.neighbors) {
      freeSpot.occupySpot(nextSpot.occupant);
      nextSpot.emptySpot();
      // System.out.println("moving " + freeSpot.occupant);

      String nextState = serializeState(parkingSpots);
      if (!visited.contains(nextState)) {
        dfs(parkingSpots, visited, nextSpot);
      }

      if (foundSolution) {
        return;
      }

      nextSpot.occupySpot(freeSpot.occupant);
      nextSpot.emptySpot();
      // System.out.println(" moving " + nextSpot.occupant + " back");
    }
  }

  private static String serializeState(List<GraphNode> parkingSpots) {
    StringBuilder builder = new StringBuilder();
    for (GraphNode node : parkingSpots) {
      builder.append(node.color + DELIMITER + node.occupant + " ");
    }

    return builder.toString();
  }

  private static void printGraph(List<GraphNode> list) {
    for (GraphNode node : list) {
      System.out.println(node.color + "=" + node.occupant);
    }
  }

  private static List<GraphNode> copyList(List<GraphNode> list) {
    List<GraphNode> copy = new ArrayList<>();
    Map<GraphNode, GraphNode> nodeMap = new HashMap<>();

    // Create new GraphNode objects and store them in a map
    for (GraphNode node : list) {
      GraphNode newNode = new GraphNode(node.color, node.occupant, new ArrayList<>());
      copy.add(newNode);
      nodeMap.put(node, newNode);
    }

    // Update the neighbor relationships in the copied graph
    for (GraphNode node : list) {
      GraphNode copiedNode = nodeMap.get(node);
      for (GraphNode neighbor : node.neighbors) {
        GraphNode copiedNeighbor = nodeMap.get(neighbor);
        copiedNode.neighbors.add(copiedNeighbor);
      }
    }

    return copy;
  }

  private static boolean isSolved(List<GraphNode> parkingSpots) {
    for (GraphNode spot : parkingSpots) {
      if (!spot.isEmpty() && !spot.isCorrect()) {
        return false;
      }
    }

    return true;
  }

  public static void main(String[] args) {
    // yellow spot red car
    // red spot blue car
    // blue spot yellow car
    // gray spot empty

    GraphNode yellow = new GraphNode(YELLOW, RED, new ArrayList<>());
    GraphNode red = new GraphNode(RED, BLUE, new ArrayList<>());
    GraphNode blue = new GraphNode(BLUE, YELLOW, new ArrayList<>());
    GraphNode grey = new GraphNode(GREY, GREY, new ArrayList<>());
    yellow.neighbors.add(red);
    yellow.neighbors.add(blue);
    yellow.neighbors.add(grey);
    red.neighbors.add(yellow);
    red.neighbors.add(blue);
    red.neighbors.add(grey);
    blue.neighbors.add(red);
    blue.neighbors.add(yellow);
    blue.neighbors.add(grey);
    grey.neighbors.add(yellow);
    grey.neighbors.add(red);
    grey.neighbors.add(blue);

    List<GraphNode> parkingSpots = new ArrayList<>(Arrays.asList(yellow, red, blue, grey));
    List<GraphNode> parkingSpots2 = copyList(parkingSpots);

    System.out.println(isSolved(parkingSpots));
    parkAllCarsDFS(parkingSpots);
    System.out.println(isSolved(parkingSpots));

    System.out.println(isSolved(parkingSpots2));
    parkingSpots2 = parkAllCarsBFS(parkingSpots2);
    System.out.println(isSolved(parkingSpots2));
  }
}
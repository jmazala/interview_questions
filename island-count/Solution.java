//https://www.pramp.com/challenge/yZm60L6d5juM7K38KYZ6
import java.io.*;
import java.util.*;

/*
Given a 2D array binaryMatrix of 0s and 1s, implement a function getNumberOfIslands that returns the number of islands of 1s in binaryMatrix.

An island is defined as a group of adjacent values that are all 1s. A cell in binaryMatrix is considered adjacent to another cell if they are next to each either on the same row or column. Note that two values of 1 are not part of the same island if they’re sharing only a mutual “corner” (i.e. they are diagonally neighbors).
*/

class Solution {
  final static int WATER = 0;
  final static int LAND = 1;
  final static int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

  static int getNumberOfIslands(int[][] binaryMatrix) {
    int numOfIslands = 0;
    
    //M x N matrix
    int M = binaryMatrix.length;
    if (M == 0) {
      return numOfIslands;
    }
    
    int N = binaryMatrix[0].length;
    if (N == 0) {
      return numOfIslands;
    }
    
    //iterate through our array
    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (binaryMatrix[i][j] == LAND) {
          numOfIslands++;
          bfs(i, j, binaryMatrix, M, N);
        }
      }
    }
    //every time we see LAND, we'll BFS from that coordinate
    //modify the input array as we continue BFS
    return numOfIslands;
  }
  
  public static void bfs(int i, int j, int[][] matrix, int M, int N) {
    Queue<int[]> queue = new LinkedList<>();
    queue.add(new int[] {i, j});
    
    while (!queue.isEmpty()) {
      int[] coords = queue.remove();
      int curI = coords[0];
      int curJ = coords[1];
      
       if (matrix[curI][curJ] != LAND) {
        continue;
      }

      //erase the land
      matrix[curI][curJ] = WATER;
      
      for (int[] direction : DIRECTIONS) {
        int nextI = curI + direction[0];
        int nextJ = curJ + direction[1];
        
        if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N) {
          continue;
        }
        
       if (matrix[nextI][nextJ] == LAND) {
         queue.add(new int[] {nextI, nextJ});           
       }
      }
    }
  }

  public static void main(String[] args) {
    int[][] binaryMatrix = {
      {0, 1, 0, 1, 0},
      {0, 0, 1, 1, 1},
      {1, 0, 0, 1, 0},
      {0, 1, 1, 0, 0},
      {1, 0, 1, 0, 1}
    };
    System.out.println(Solution.getNumberOfIslands(binaryMatrix)); // 6

  }

}

//https://www.youtube.com/watch?v=jWq7nzfgQ9A&list=RDCMUCNc-Wa_ZNBAGzFkYbAHw9eg&index=1
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class Node {
  int value;
  Node left;
  Node right;

  public Node(int value) {
    this.value = value;
  }
}

class Solution {
  public static Node combineHeap(Node first, Node second) {
    List<Integer> everything = new ArrayList<>();
    Queue<Node> queue = new LinkedList<>();
    queue.add(first);
    queue.add(second);

    while (!queue.isEmpty()) {
      Node node = queue.remove();
      everything.add(node.value);

      if (node.left != null) {
        queue.add(node.left);
      }

      if (node.right != null) {
        queue.add(node.right);
      }
    }

    Collections.sort(everything, (a, b) -> {
      return b - a;
    });

    Node root = new Node(everything.get(0));
    Node temp = root;

    for (int i = 1; i < everything.size(); i++) {
      temp.right = new Node(everything.get(i));
      temp = temp.right;
    }

    return root;

    // largest element is the root
    // sort the list
    // left child[i] = 2 * i
    // right child[i] = (2 * i) + 1

  }

  public static Node combineHeapsFaster(Node heapOne, Node heapTwo) {
    if (heapTwo == null) {
      return heapOne;
    }

    if (heapOne.value > heapTwo.value) {
      Node oldSubtree = heapOne.left;
      heapOne.left = heapTwo;
      return combineHeapsFaster(heapOne, oldSubtree);
    }

    Node oldSubtree = heapTwo.left;
    heapTwo.left = heapOne;
    return combineHeapsFaster(heapTwo, oldSubtree);
  }
}
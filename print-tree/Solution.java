//https://www.youtube.com/watch?v=V0xjK_6ZoEY
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Relation {
  String child;
  String parent;

  public Relation(String parent, String child) {
    this.child = child;
    this.parent = parent;
  }
}

class Solution {
  public void printTree(List<Relation> pairs) {
    Map<String, List<String>> map = new HashMap<>();
    Set<String> children = new HashSet<>();

    for (Relation pair : pairs) {
      if (!map.containsKey(pair.parent)) {
        map.put(pair.parent, new ArrayList<String>());
      }

      map.get(pair.parent).add(pair.child);
      children.add(pair.child);
    }

    // how do we find this root?
    // dfs while keeping track of depth
    String root = "";
    for (Map.Entry<String, List<String>> entry : map.entrySet()) {
      if (!children.contains(entry.getKey())) {
        root = entry.getKey();
        break;
      }
    }
    dfs(root, 0, map);
  }

  public void dfs(String root, int spacing, Map<String, List<String>> map) {
    StringBuilder builder = new StringBuilder();
    for (int i = 0; i < spacing; i++) {
      builder.append("\t");
    }

    builder.append(root);
    System.out.println(builder.toString());
    if (map.containsKey(root)) {
      for (String child : map.get(root)) {
        dfs(child, spacing + 1, map);
      }
    }
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    List<Relation> input = new ArrayList<>();
    input.add(new Relation("animal", "mammal"));
    input.add(new Relation("animal", "bird"));
    input.add(new Relation("lifeform", "animal"));
    input.add(new Relation("cat", "lion"));
    input.add(new Relation("mammal", "cat"));
    input.add(new Relation("animal", "fish"));
    s.printTree(input);
  }
}
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class LRUCacheItem {
  int key;
  long lastAccessedTime;
  int value;

  public LRUCacheItem(int key, int value) {
    this.value = value;
    this.key = key;
    updateLastAccessedTime();
  }

  public void updateLastAccessedTime() {
    this.lastAccessedTime = System.nanoTime();
  }
}

public class LRUCache {
  int capacity;
  Map<Integer, LRUCacheItem> hash;
  PriorityQueue<LRUCacheItem> minHeap = new PriorityQueue<>(
      (a, b) -> Long.compare(a.lastAccessedTime, b.lastAccessedTime));

  public LRUCache(int capacity) {
    this.capacity = capacity;
    this.hash = new HashMap<>();
  }

  public void put(int key, int value) {
    LRUCacheItem item = new LRUCacheItem(key, value);
    hash.put(key, item);
    minHeap.add(item);
    if (hash.size() > capacity) {
      LRUCacheItem itemToRemove = minHeap.remove();
      hash.remove(itemToRemove.key);
    }
  }

  public Integer get(int key) {
    LRUCacheItem item = hash.get(key);
    if (item == null) {
      return null;
    }

    // unfortunately, the heap doesn't magically re-sort itself
    // based on updating the object in the hash
    minHeap.remove(item);
    item.updateLastAccessedTime();
    minHeap.add(item);
    return item.value;
  }

  public static void main(String[] args) {
    LRUCache cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    System.out.println(cache.get(1)); // 1
    cache.put(3, 3); // evicts 2 because that's not recently accessed
    System.out.println(cache.get(2)); // null bc key was evicted
    cache.put(4, 4); // evict key 1
    System.out.println(cache.get(1)); // null bc evicted
    System.out.println(cache.get(3)); // 3
    System.out.println(cache.get(4)); // 4
  }
}
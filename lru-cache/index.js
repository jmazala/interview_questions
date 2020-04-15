// https://youtu.be/yYA_jPqjV1g
// https://interviewing.io/recordings/Javascript-Pivotal-Labs-1

//implement LRU cache
//we don't want this to grow indefinitely
//cache has a max size, and when a key is inserted beyond that max size
//the oldest key is removed

//implement the following

//get(key) gets the value of the key if it exists
//put(key, value) updates or inserts that value for that key
//when over capacity it'll remove the oldest element

function LruCache(capacity) {
  this.capacity = capacity;
  return this;
}



cache = new LruCache();

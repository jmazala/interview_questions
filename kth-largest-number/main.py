#https://www.youtube.com/watch?v=QGVCnjXmrNg
from typing import List
import heapq

#using partitioning
class Solution:

  def findKthLargestNumberPartioning(self, nums: List[int], k: int):
    if (k == 0):
      return None
    
    #loop to keep subdividing the problem
    left = 0
    right = len(nums) - 1
    while left <= right:
      pivotIndex = self.partition(nums, left, right)
      if pivotIndex == len(nums) - k:
        return nums[pivotIndex]
      elif pivotIndex > len(nums) - k:
        right = pivotIndex - 1
      else:
        left = pivotIndex + 1
    
    return None

  #partition to mutate the array
  def partition(self, arr, left, right):
    pivot = arr[right] #have to pick one, so just choose rightmost
    index = left
    
    for j in range(left, right):
      if arr[j] <= pivot:
        arr[index], arr[j] = arr[j], arr[index]
        index += 1
    
    arr[index], arr[right] = arr[right], arr[index]
    return index

#building entire heap
def findKthLargestNumberEntireHeap(nums: List[int], k: int):
  if k == 0:
    return None
  
  pq = []

  for num in nums:
    heapq.heappush(pq, (-1 * num, num)) #to sort descending
  
  for i in range(k):
    (_, answer) = heapq.heappop(pq)
  
  return answer

#don't build entire heap
def findKthLargestNumber(nums: List[int], k: int):
  if k == 0:
    return None
  
  pq = []

  for num in nums:
    heapq.heappush(pq, num)
    if len(pq) > k:
      heapq.heappop(pq)
  
  return heapq.heappop(pq)


if __name__ == '__main__':
  s = Solution()
  nums = [5, 7, 2, 3, 4, 1, 6]
  for i in range(1, len(nums) + 1):
    print(findKthLargestNumberEntireHeap(nums, i))
    print(findKthLargestNumber(nums, i))
    print(s.findKthLargestNumberPartioning(nums, i))
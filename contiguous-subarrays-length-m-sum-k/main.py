"""
Given an array of integers a, your task is to find how many of its contiguous subarrays of length m contain a pair of integers with a sum equal to k.

More formally, given the array a, your task is to count the number of indices 0 ≤ i ≤ a.length - m such that a subarray [a[i], a[i + 1], ..., a[i + m - 1]] contains at least one pair (a[s], a[t]), where:

s ≠ t
a[s] + a[t] = k
Example

For a = [2, 4, 7, 5, 3, 5, 8, 5, 1, 7], m = 4, and k = 10, the output should be solution(a, m, k) = 5.

Let's consider all subarrays of length m = 4 and see which fit the description conditions:

Subarray a[0..3] = [2, 4, 7, 5] doesn't contain any pair of integers with a sum of k = 10. Note that although the pair (a[3], a[3]) has the sum 5 + 5 = 10, it doesn't fit the requirement s ≠ t.
Subarray a[1..4] = [4, 7, 5, 3] contains the pair (a[2], a[4]), where a[2] + a[4] = 7 + 3 = 10.
Subarray a[2..5] = [7, 5, 3, 5] contains two pairs (a[2], a[4]) and (a[3], a[5]), both with a sum of k = 10.
Subarray a[3..6] = [5, 3, 5, 8] contains the pair (a[3], a[5]), where a[3] + a[5] = 5 + 5 = 10.
Subarray a[4..7] = [3, 5, 8, 5] contains the pair (a[5], a[7]), where a[5] + a[7] = 5 + 5 = 10.
Subarray a[5..8] = [5, 8, 5, 1] contains the pair (a[5], a[7]), where a[5] + a[7] = 5 + 5 = 10.
Subarray a[6..9] = [8, 5, 1, 7] doesn't contain any pair with a sum of k = 10.
So the answer is 5, because there are 5 contiguous subarrays that contain a pair with a sum of k = 10.

For a = [15, 8, 8, 2, 6, 4, 1, 7], m = 2, and k = 8, the output should be solution(a, m, k) = 2.

There are 2 subarrays satisfying the description conditions:

a[3..4] = [2, 6], where 2 + 6 = 8
a[6..7] = [1, 7], where 1 + 7 = 8
"""


from collections import defaultdict


def solution(a, m, k):
    answer = 0
    numCount = defaultdict(int)
    complementIndex = defaultdict(int)
    lastIndexOfMatch = -1

    # Process first window of size m
    for right in range(m):
        num = a[right]
        if num in complementIndex:
            answer = 1  # not += 1, 1 subarray = 1 match
            lastIndexOfMatch = complementIndex[num]

        numCount[num] += 1
        complementIndex[k - num] = right

    for right in range(m, len(a)):
        left = right - m
        leftNum = a[left]
        rightNum = a[right]

        numCount[leftNum] -= 1

        if numCount[leftNum] == 0:
            del complementIndex[k - leftNum]

        if rightNum in complementIndex:
            answer += 1
            lastIndexOfMatch = max(complementIndex[rightNum], lastIndexOfMatch)

        elif lastIndexOfMatch > left:
            answer += 1

        numCount[rightNum] += 1
        complementIndex[k - rightNum] = right

    return answer


print(solution([2, 4, 8, 7, 5, 3, 5, 8, 5, 1, 7], 4, 10))  # 6
print(solution([2, 4, 7, 5, 3, 5, 8, 5, 1, 7], 4, 10))  # 5

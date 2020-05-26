#https://aonecode.com/amazon-online-assessment-zombie-matrix
ZOMBIE = 1
HUMAN = 0
DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]]

def humanDays(matrix):
    """
    :type matrix: List[List[int]]
    :rtype: int
    """    
    M = len(matrix)
    if (M == 0):
        return -1
    
    N = len(matrix[0])
    if (N == 0):
        return -1
    
    days = -1    
    queue = []
    
    for i in range(M):
        for j in range(N):
            if matrix[i][j] == ZOMBIE:
                queue.append([i,j])

    while len(queue) > 0:
        numNodes = len(queue)
        
        while (numNodes > 0):
            [curI, curJ] = queue.pop(0)
            numNodes -= 1
            if (matrix[curI][curJ] != ZOMBIE):
              continue
            
            for [iDelta, jDelta] in DIRECTIONS:
                nextI = curI + iDelta
                nextJ = curJ + jDelta
                
                if (nextI < 0 or nextJ < 0 or nextI >= M or nextJ >= N):
                    continue
                
                if matrix[nextI][nextJ] == HUMAN:
                    queue.append([nextI, nextJ])
                    matrix[nextI][nextJ] = ZOMBIE
        
        days += 1
                
    return days
    
print(humanDays([
  [0, 1, 1, 0, 1],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0]])) #2

print(humanDays([[0,0]])) #-1
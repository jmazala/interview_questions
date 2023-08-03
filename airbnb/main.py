# We are given a one dimensional terrain represented by an array, where the index represents the coordinate and the value represents the altitude. We also have a bucket of water. We dump this bucket of water in a single point of the terrain, and the water will collect at various points of the basins in the terrain. Write a function which takes in the terrain, the amount of water, dump point, and then print out the image of the resulting terrain. Use + to represent earth and W to represent water.

# A terrain of [5,4,2,1,2,3,2,1,0,1,2,4] will look like
# +
# ++         +
# ++   +     +
# +++ +++   ++
# ++++++++ +++
# ++++++++++++

# water_amount = 8
# dump_location = 1

# dump_water(terrain, water_amount, dump_location)
# =>
# +
# ++         +
# ++WWW+     +
# +++W+++WWW++
# ++++++++W+++
# ++++++++++++

"""
extra considerations:
draw the bottom line ("+".join(len(terrain) + 2))
"""

EARTH = "+"
WATER = "W"


# TIME COMPLEXITY O(min(W, max(terrain)) * N)
#   O(W) for pouring until pool overflows
#       O(N) to find a spot (worst case)
# SPACE: O(min(W, max(terrain)) * N) for output matrix
def dumpWater(terrain, waterAmount, dumpPoint) -> None:
    if len(terrain) < 3:
        return

    # validate input
    pool = getPool(terrain)

    for _ in range(waterAmount):
        fillIndex = getFillIndex(terrain, dumpPoint)

        # pool overflowed
        if fillIndex == -1:
            break

        terrain[fillIndex] += 1
        height = terrain[fillIndex]
        pool[height - 1][fillIndex] = WATER

    # print pool
    for row in reversed(pool):
        print("".join(row))

    # print ground
    print("".join([EARTH * len(terrain)]))


def getFillIndex(terrain, dumpPoint):
    left = fillLeft(terrain, dumpPoint)
    if left != -1:
        return left

    right = fillRight(terrain, dumpPoint)
    if right != -1:
        return right

    return fillStraight(terrain, dumpPoint)


def getPool(terrain):
    pool = []
    n = len(terrain)

    for col, height in enumerate(terrain):
        for i in range(height):
            if len(pool) < i + 1:
                pool.append([" "] * n)
            pool[i][col] = EARTH

    return pool


# look to left for lower ground, stop at higher ground
# don't forget we can go FURTHER downhill (don't stop when you hit first lower ground)
def fillLeft(terrain, i) -> int:
    fill = i

    while i > 0:
        if terrain[i - 1] <= terrain[i]:
            fill = i - 1
            i -= 1
        else:
            break

    return fill if fill != 0 and fill != i else -1


def fillRight(terrain, i) -> int:
    fill = i
    while i < len(terrain) - 1:
        if terrain[i + 1] <= terrain[i]:
            fill = i + 1
            i += 1
        else:
            break

    return fill if fill != 0 and fill != len(terrain) - 1 else -1


def fillStraight(terrain, i) -> int:
    if i == 0 or i == len(terrain) - 1:
        return -1

    return i if terrain[i - 1] > terrain[i] or terrain[i + 1] > terrain[i] else -1


for w in range(0, 26):
    dumpWater([5, 4, 2, 1, 2, 3, 2, 1, 0, 1, 2, 4], w, 1)
    print("\n")

# dumpWater([5, 4, 2, 1, 2, 3, 2, 1, 0, 1, 2, 4], 1000, 1)
# print("\n")

# dumpWater([5, 4, 2, 1, 2, 3, 2, 1, 0, 1, 2, 5], 1000, 1)
# print("\n")

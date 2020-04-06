#https://www.youtube.com/watch?v=HWW-jA6YjHk&t=2549s
def numCoins(target, coins=[2, 10, 5, 25]):
  coins = sorted(coins)

  dp = [None for _ in range(target + 1)]
  dp[0] = 0 #it takes 0 coins to make 0 cents

  for i in range(1, target + 1):
    for coin in coins:
      if coin > i:
        break
      if (dp[i - coin] is None):
        continue
      else:
        dp[i] = dp[i - coin] + 1
  
  return dp[target] if dp[target] is not None else -1


print(numCoins(1)) # -1
print(numCoins(3)) # -1
print(numCoins(6)) # 2
print(numCoins(60)) # 3
print(numCoins(65)) # 4
print(numCoins(66)) # 6
print(numCoins(90)) # 5

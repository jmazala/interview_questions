#https://aonecode.com/amazon-online-assessment-partition-string

def partitionString(input):
    """
    :type input: str
    :rtype: List[str]
    """
    
    hash = {}
    
    for i in range(len(input)):
        c = input[i]
        hash[c] = i
    
    parts = []
    charsUsed = set([])
    
    i = 0
    while (i < len(input)):
        c = input[i]
        if c in charsUsed:
          i += 1
          continue
        
        part = []
        last = hash[c]
        while (i <= last):
          nextChar = input[i]
          last = max(last, hash[nextChar])
          part.append(input[i])
          charsUsed.add(input[i])
          i += 1

        parts.append("".join(part))
    
    return parts

print(partitionString("bbeadcxede")) #[“bb”, “eadcxede”]
print(partitionString("abab"))  #[abab]
print(partitionString("baddacx")) #[“b”, “adda", “c”, “x”]
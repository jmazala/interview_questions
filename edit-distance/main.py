#https://www.youtube.com/watch?v=wyu6VRmtCmE
# def case_insensitive_compare(s1, s2):
#   return s1.upper() == s2.upper()

def case_insensitive_compare(s1, s2):
  if (len(s1) != len(s2)):
    return False
  
  for i in range(len(s1)):
    if s1[i].upper() != s2[i].upper():
      return False
  
  return True

def edit_distance_compare(s1, s2):
  editDistance = 0
  for i in range(max(len(s1), len(s2))):
    if i >= len(s1) or i >= len(s2) or s1[i] != s2[i]:
      editDistance += 1
  
  return editDistance

def insert_delete_compare(s1, s2):
  if len(s1) == len(s2):
    return case_insensitive_compare(s1, s2)
  
  if (abs(len(s1) - len(s2)) > 1):
    return False
  
  short_string, long_string = sorted([s1, s2], key=len)
  short_index = 0
  long_index = 0

  for _ in range(len(short_string)):
    short_c = short_string[short_index]
    long_c = long_string[long_index]
    if short_c.upper() != long_c.upper():
      long_index += 1
      long_c = long_string[long_index]
      if long_c.upper() != short_c.upper():
        return False
  
  return True

#wrinkle.  true if same or if edit distance is one or less
# print(case_insensitive_compare("abc", "ABC"))
# print(edit_distance_compare("abc", "ABC"))
# print(edit_distance_compare("ABCD", "ABC"))
# print(edit_distance_compare("abc", "abc"))
print(insert_delete_compare("abc", u"ABC"))
print(insert_delete_compare("abc", "def"))
print(insert_delete_compare("abc", u"ABCD"))
print(insert_delete_compare("abc", u"AC"))

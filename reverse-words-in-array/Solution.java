//https://www.youtube.com/watch?v=aotBpjJUqJo&t=1800s

public class Solution {
  public static char[] reverseCharArray(char[] chars) {
    reverseCharArray(chars, 0, chars.length - 1);
    return chars;
  }

  public static void reverseCharArray(char[] chars, int start, int end) {
    for (int i = 0; i < Math.ceil((start + end) / 2); i++) {
      char temp = chars[start + i];
      chars[start + i] = chars[end - i];
      chars[end - i] = temp;
    }
  }

  public static String reverseSentence(String s) {
    return Solution.reverseSentence(s, 0, s.length() - 1);
  }
  
  public static String reverseSentence(String s, int start, int end) {
    StringBuilder builder = new StringBuilder();
    for (int i = 0; i < start; i++) {
      builder.append(s.charAt(i));
    }

    for (int i = end; i >= start; i--) {
      builder.append(s.charAt(i));
    }

    for (int i = end; i < s.length() - 1; i++) {
      builder.append(s.charAt(i));
    }

    return builder.toString();
  }

  public static void main(String[] args) {
    System.out.println(Solution.reverseSentence("topaet elttil a m'I"));
    System.out.println(Solution.reverseCharArray(new char[] {'t', 'o', 'p', 'a', 'e', 't', ' ', 'e', 'l', 't', 't', 'i', 'l', ' ', 'a', ' ', 'm', '\'', 'I'}));
  }
}
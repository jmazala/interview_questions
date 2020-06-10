//https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=238827593802550
class Main {

  private boolean isLowercase(char c) {
    return c >= 'a' && c <= 'z';
  }

  private boolean isUppercase(char c) {
    return c >= 'A' && c <= 'Z';
  }

  private boolean isDigit(char c) {
    return c >= '0' && c <= '9';
  }

  private char rotateLowercase(char c, int rotationFactor) {
    return (char) ('a' + ((c - 'a' + rotationFactor) % 26));
  }

  private char rotateUppercase(char c, int rotationFactor) {
    return (char) ('A' + ((c - 'A' + rotationFactor) % 26));
  }

  private char rotateDigit(char c, int rotationFactor) {
    return (char) ('0' + ((c - '0' + rotationFactor) % 10));
  }

  String rotationalCipher(String input, int rotationFactor) {
    char[] array = input.toCharArray();

    for (int i = 0; i < array.length; i++) {
      char c = array[i];
      if (isLowercase(c)) {
        array[i] = rotateLowercase(c, rotationFactor);
      } else if (isUppercase(c)) {
        array[i] = rotateUppercase(c, rotationFactor);
      } else if (isDigit(c)) {
        array[i] = rotateDigit(c, rotationFactor);
      }
    }

    return String.valueOf(array);
  }

  // These are the tests we use to determine if the solution is correct.
  // You can add your own at the bottom, but they are otherwise not editable!
  int test_case_number = 1;

  void check(String expected, String output) {
    boolean result = (expected.equals(output));
    char rightTick = '\u2713';
    char wrongTick = '\u2717';
    if (result) {
      System.out.println(rightTick + " Test #" + test_case_number);
    } else {
      System.out.print(wrongTick + " Test #" + test_case_number + ": Expected ");
      printString(expected);
      System.out.print(" Your output: ");
      printString(output);
      System.out.println();
    }
    test_case_number++;
  }

  void printString(String str) {
    System.out.print("[\"" + str + "\"]");
  }

  public void run() {
    String input_1 = "All-convoYs-9-be:Alert1.";
    int rotationFactor_1 = 4;
    String expected_1 = "Epp-gsrzsCw-3-fi:Epivx5.";
    String output_1 = rotationalCipher(input_1, rotationFactor_1);
    check(expected_1, output_1);

    String input_2 = "abcdZXYzxy-999.@";
    int rotationFactor_2 = 200;
    String expected_2 = "stuvRPQrpq-999.@";
    String output_2 = rotationalCipher(input_2, rotationFactor_2);
    check(expected_2, output_2);

    String input_3 = "abcdefghijklmNOPQRSTUVWXYZ0123456789";
    int rotationFactor_3 = 39;
    String expected_3 = "nopqrstuvwxyzABCDEFGHIJKLM9012345678";
    String output_3 = rotationalCipher(input_3, rotationFactor_3);
    check(expected_3, output_3);

    String input_4 = "Zebra-493?";
    int rotationFactor_4 = 3;
    String expected_4 = "Cheud-726?";
    String output_4 = rotationalCipher(input_4, rotationFactor_4);
    check(expected_4, output_4);

  }

  public static void main(String[] args) {
    new Main().run();
  }
}
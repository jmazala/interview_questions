//https://aonecode.com/amazon-online-assessment-top-n-buzzwords

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class HeapItem {
  public String word;
  public int mentions;
  public int quotes;

  public HeapItem(String word, int mentions, int quotes) {
    this.word = word;
    this.mentions = mentions;
    this.quotes = quotes;
  }
}

public class Solution {
  public static List<String> getTopToys(int numCompetitors, int topNCompetitors, String[] competitors, int numReviews,
      String[] reviews) {

    // make a heap of: mentions, distinct quotes
    Map<String, HeapItem> hash = new HashMap<>();
    for (String word : competitors) {
      HeapItem item = new HeapItem(word.toLowerCase(), 0, 0);
      hash.put(word.toLowerCase(), item);
    }

    Pattern lowercase = Pattern.compile("[a-z]+");
    for (String review : reviews) {
      Set<String> addedWords = new HashSet<>();

      for (String word : review.split(" ")) {
        word = word.toLowerCase();
        Matcher matcher = lowercase.matcher(word);
        if (!matcher.find()) {
          continue;
        }

        word = matcher.group(0);

        HeapItem item = hash.get(word);
        if (item == null) {
          continue;
        }

        item.mentions++;
        addedWords.add(word);
      }

      for (String word : addedWords) {
        hash.get(word).quotes++;
      }
    }

    PriorityQueue<HeapItem> minHeap = new PriorityQueue<>((a, b) -> {
      if (a.mentions == b.mentions) {
        return a.quotes - b.quotes;
      }

      return a.mentions - b.mentions;
    });

    for (HeapItem item : hash.values()) {
      minHeap.add(item);
      if (minHeap.size() > topNCompetitors) {
        minHeap.remove();
      }
    }

    List<String> result = new ArrayList<>();
    while (!minHeap.isEmpty()) {
      result.add(0, minHeap.remove().word);
    }

    return result;
  }

  public static void main(String[] args) {
    int numCompetitors = 6;
    int topNCompetitors = 2;
    String[] competitors = { "elmo", "elsa", "legos", "drone", "tablet", "warcraft" };
    int numReviews = 6;
    String[] reviews = { "Elmo! is the hottest of the season! Elmo will be on every kid's wishlist!",
        "The new Elmo dolls are super high quality", "Expect the Elsa dolls to be very popular this year, Elsa!",
        "Elsa and Elmo are the toys I'll be buying for my kids, Elsa is good",
        "For parents of older kids, look into buying them a drone",
        "Warcraft is slowly rising in popularity ahead of the holiday season" };

    // [Elmo, Elsa]
    System.out.println(Solution.getTopToys(numCompetitors, topNCompetitors, competitors, numReviews, reviews));
  }
}
#include <gtest/gtest.h>

#include <unordered_set>

#include "blackjack/hand.hpp"

using namespace Blackjack;

TEST(CardTest, NonDefaultConstructor) {
  Card card{Rank::nine, Suit::diamonds, true};

  EXPECT_EQ(card.rank, Rank::nine);
  EXPECT_EQ(card.suit, Suit::diamonds);
  EXPECT_EQ(card.hidden, true);
}

TEST(CardTest, Equal) {
  bool test_1 = (Card{Rank::jack, Suit::diamonds, false} ==
                 Card{Rank::jack, Suit::diamonds, false});
  bool test_2 = (Card{Rank::ace, Suit::spades, false} ==
                 Card{Rank::ace, Suit::spades, false});
  bool test_3 = (Card{Rank::ten, Suit::hearts, false} ==
                 Card{Rank::ten, Suit::hearts, false});

  EXPECT_TRUE(test_1);
  EXPECT_TRUE(test_2);
  EXPECT_TRUE(test_3);
}

TEST(CardTest, Hash) {
  EXPECT_EQ(std::hash<Card>{}(Card{Rank::ace, Suit::clubs, false}), 0);
  EXPECT_EQ(std::hash<Card>{}(Card{Rank::king, Suit::spades, false}), 60);
  EXPECT_EQ(std::hash<Card>{}(Card{Rank::seven, Suit::diamonds, false}), 22);
}

TEST(StandardDeckTest, Constructors) {
  StandardDeck deck{};
  EXPECT_EQ(deck.cards.size(), NUMBER_OF_CARDS);

  std::unordered_set<Card> unique_cards{};
  std::for_each(
      deck.cards.cbegin(), deck.cards.cend(),
      [&unique_cards](const auto& card) { unique_cards.emplace(card); });
  EXPECT_EQ(unique_cards.size(), NUMBER_OF_CARDS);
}
#include <gtest/gtest.h>

#include "blackjack/hand.hpp"

using namespace Blackjack;

TEST(HandTest, GetValue) {
  Hand hand_1{}, hand_2{}, hand_3{}, hand_4{}, hand_5{};

  hand_1.cards.emplace_back(Card{Rank::ace, Suit::clubs, false});
  hand_1.cards.emplace_back(Card{Rank::two, Suit::diamonds, false});
  hand_1.cards.emplace_back(Card{Rank::three, Suit::hearts, false});

  hand_2.cards.emplace_back(Card{Rank::ace, Suit::spades, false});
  hand_2.cards.emplace_back(Card{Rank::ace, Suit::clubs, false});
  hand_2.cards.emplace_back(Card{Rank::seven, Suit::diamonds, false});

  hand_3.cards.emplace_back(Card{Rank::ace, Suit::hearts, false});
  hand_3.cards.emplace_back(Card{Rank::ace, Suit::spades, false});
  hand_3.cards.emplace_back(Card{Rank::ace, Suit::clubs, false});

  hand_4.cards.emplace_back(Card{Rank::ace, Suit::diamonds, false});
  hand_4.cards.emplace_back(Card{Rank::ace, Suit::hearts, false});
  hand_4.cards.emplace_back(Card{Rank::ace, Suit::spades, false});
  hand_4.cards.emplace_back(Card{Rank::ace, Suit::clubs, false});

  hand_5.cards.emplace_back(Card{Rank::ace, Suit::diamonds, false});
  hand_5.cards.emplace_back(Card{Rank::ace, Suit::hearts, false});
  hand_5.cards.emplace_back(Card{Rank::ace, Suit::spades, false});
  hand_5.cards.emplace_back(Card{Rank::ace, Suit::clubs, false});
  hand_5.cards.emplace_back(Card{Rank::king, Suit::clubs, false});

  const Hand::Values value_1 = get_values(hand_1), value_2 = get_values(hand_2),
                     value_3 = get_values(hand_3), value_4 = get_values(hand_4),
                     value_5 = get_values(hand_5);

  EXPECT_EQ(value_1, (Hand::Values{6, 16}));
  EXPECT_EQ(value_2, (Hand::Values{9, 19, 29}));
  EXPECT_EQ(value_3, (Hand::Values{3, 13, 23, 33}));
  EXPECT_EQ(value_4, (Hand::Values{4, 14, 24, 34, 44}));
  EXPECT_EQ(value_5, (Hand::Values{14, 24, 34, 44, 54}));
}

TEST(HandTest, MoveACard) {
  StandardDeck deck{};
  Hand hand{};

  for (int i = 0; i < 5; i++) {
    EXPECT_TRUE(deck.cards.back().hidden);
    move_a_card(deck, hand, false);
    EXPECT_FALSE(hand.cards.back().hidden);
  }

  EXPECT_EQ(hand.cards.size(), 5);
  EXPECT_EQ(deck.cards.size(), NUMBER_OF_CARDS - 5);
}
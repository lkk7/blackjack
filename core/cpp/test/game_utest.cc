
#include <gtest/gtest.h>

#include "blackjack/game.hpp"

using namespace Blackjack;

TEST(GameTest, TableConstructor) {
  Table table{Hand{}, Hand{}, StandardDeck{}, 1000};

  move_a_card(table.deck, table.player_hand, true);
  move_a_card(table.deck, table.dealer_hand, true);

  EXPECT_EQ(table.player_hand.cards.size(), 1);
  EXPECT_EQ(table.dealer_hand.cards.size(), 1);
  EXPECT_EQ(table.deck.cards.size(), NUMBER_OF_CARDS - 2);
  EXPECT_EQ(table.bet_money, 1000);
}

TEST(GameTest, NonDefaultConstructor) {
  Table table{Hand{}, Hand{}, StandardDeck{}, 1000};

  for (int i = 0; i < 3; i++) {
    move_a_card(table.deck, table.player_hand, true);
    move_a_card(table.deck, table.dealer_hand, true);
  }

  Game game{std::move(table)};

  EXPECT_EQ(game.table.player_hand.cards.size(), 3);
  EXPECT_EQ(game.table.dealer_hand.cards.size(), 3);
  EXPECT_EQ(game.table.deck.cards.size(), NUMBER_OF_CARDS - 6);
  EXPECT_EQ(game.table.bet_money, 1000);
}

TEST(GameTest, DealInitial) {
  Game game{};
  auto &player_cards = game.table.player_hand.cards,
       &dealer_cards = game.table.dealer_hand.cards;

  game.deal_initial();

  EXPECT_EQ(player_cards.size(), 2);
  EXPECT_FALSE(player_cards[0].hidden);
  EXPECT_FALSE(player_cards[1].hidden);
  EXPECT_EQ(dealer_cards.size(), 2);
  EXPECT_FALSE(dealer_cards[0].hidden);
  EXPECT_TRUE(dealer_cards[1].hidden);
}

TEST(GameTest, GetStateAfterDeal) {
  Game game{};

  auto &player_cards = game.table.player_hand.cards,
       &dealer_cards = game.table.dealer_hand.cards;

  player_cards.emplace_back(Card{Rank::ace, Suit::hearts, true});
  dealer_cards.emplace_back(Card{Rank::ace, Suit::spades, true});

  EXPECT_EQ(game.get_state_after_deal(), GameState::player_to_hit);

  player_cards.emplace_back(Card{Rank::jack, Suit::hearts, true});

  EXPECT_EQ(game.get_state_after_deal(), GameState::player_win);

  dealer_cards.emplace_back(Card{Rank::queen, Suit::clubs, true});

  EXPECT_EQ(game.get_state_after_deal(), GameState::draw);

  player_cards.pop_back();

  EXPECT_EQ(game.get_state_after_deal(), GameState::dealer_win);
}

TEST(GameTest, GetStateAfterHit) {
  Game game{};
  auto &player_cards = game.table.player_hand.cards,
       &dealer_cards = game.table.dealer_hand.cards;

  auto add_card_to_all = [&](auto card) {
    player_cards.emplace_back(card);
    dealer_cards.emplace_back(card);
  };

  add_card_to_all(Card{Rank::ace, Suit::spades, true});

  EXPECT_EQ(game.get_state_after_hit(true), GameState::player_to_hit);
  EXPECT_EQ(game.get_state_after_hit(false), GameState::dealer_to_hit);

  add_card_to_all(Card{Rank::queen, Suit::clubs, true});

  EXPECT_EQ(game.get_state_after_hit(true), GameState::player_win);
  EXPECT_EQ(game.get_state_after_hit(false), GameState::dealer_win);

  add_card_to_all(Card{Rank::jack, Suit::hearts, true});
  add_card_to_all(Card{Rank::king, Suit::diamonds, true});

  EXPECT_EQ(game.get_state_after_hit(true), GameState::dealer_win);
  EXPECT_EQ(game.get_state_after_hit(false), GameState::player_win);
}

TEST(GameTest, GetStateFinal) {
  Game game{};
  auto &player_cards = game.table.player_hand.cards,
       &dealer_cards = game.table.dealer_hand.cards;

  EXPECT_EQ(game.get_state_final(), GameState::draw);

  player_cards.emplace_back(Card{Rank::five, Suit::diamonds, true});

  EXPECT_EQ(game.get_state_final(), GameState::player_win);

  dealer_cards.emplace_back(Card{Rank::queen, Suit::spades, true});

  EXPECT_EQ(game.get_state_final(), GameState::dealer_win);

  player_cards.emplace_back(Card{Rank::ace, Suit::clubs, true});
  player_cards.emplace_back(Card{Rank::ace, Suit::spades, true});
  player_cards.emplace_back(Card{Rank::nine, Suit::hearts, true});

  EXPECT_EQ(game.get_state_final(), GameState::player_win);

  dealer_cards.emplace_back(Card{Rank::six, Suit::diamonds, true});

  EXPECT_EQ(game.get_state_final(), GameState::draw);
}

TEST(GameTest, PlayerHit) {
  Game game{};
  auto &player_cards = game.table.player_hand.cards;

  EXPECT_EQ(player_cards.size(), 0);

  game.player_hit();

  EXPECT_EQ(player_cards.size(), 1);
  EXPECT_EQ(game.get_state_after_hit(true), GameState::player_to_hit);
}

TEST(GameTest, DealerHit) {
  Game game{};
  auto &dealer_cards = game.table.dealer_hand.cards;

  EXPECT_EQ(dealer_cards.size(), 0);

  game.dealer_hit();

  EXPECT_EQ(dealer_cards.size(), 1);
  EXPECT_EQ(game.get_state_after_hit(false), GameState::dealer_to_hit);
}

TEST(GameTest, ShouldDealerHit) {
  Game game{};
  game.game_state = GameState::dealer_to_hit;
  auto &dealer_cards = game.table.dealer_hand.cards;

  dealer_cards.emplace_back(Card{Rank::ace, Suit::spades, true});
  EXPECT_TRUE(game.should_dealer_hit());

  dealer_cards.emplace_back(Card{Rank::ace, Suit::clubs, true});
  EXPECT_TRUE(game.should_dealer_hit());

  dealer_cards.emplace_back(Card{Rank::four, Suit::hearts, true});
  EXPECT_TRUE(game.should_dealer_hit());

  dealer_cards.emplace_back(Card{Rank::ace, Suit::diamonds, true});
  EXPECT_FALSE(game.should_dealer_hit());

  dealer_cards.emplace_back(Card{Rank::jack, Suit::spades, true});
  EXPECT_FALSE(game.should_dealer_hit());
}
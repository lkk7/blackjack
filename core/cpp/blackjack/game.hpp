#ifndef game_HPP
#define game_HPP

#include "card.hpp"
#include "hand.hpp"

namespace Blackjack {

inline constexpr int BLACKJACK_VALUE = 21;
inline constexpr int DEALER_THRESHOLD = 17;

// Possible game states
enum class GameState {
  yet_to_deal,
  player_to_hit,
  dealer_to_hit,
  player_win,
  dealer_win,
  draw
};

struct Table {
  Table() = default;
  Table(Hand&& player_hand, Hand&& dealer_hand, StandardDeck&& deck,
        unsigned bet_money)
      : player_hand(std::move(player_hand)),
        dealer_hand(std::move(dealer_hand)),
        deck(std::move(deck)),
        bet_money(bet_money) {}

  Hand player_hand;
  Hand dealer_hand;
  StandardDeck deck;
  unsigned bet_money = 0;
};

class Game {
 public:
  Game() = default;
  Game(Table&& table)
      : table(std::move(table)), game_state(GameState::yet_to_deal) {}
  // Deal two cards to everyone
  void deal_initial();
  // Return the game state after the initial deal
  GameState get_state_after_deal() const;
  // Return the game state after the player or dealer hits
  GameState get_state_after_hit(bool is_player) const;
  // Return the game state when everyone has finished hitting
  GameState get_state_final() const;
  // Make the player hit and update the state
  void player_hit();
  // Make the dealer hit and update the state
  void dealer_hit();
  // Return whether the dealer should continue hitting
  bool should_dealer_hit() const;

  Table table;
  GameState game_state = GameState::yet_to_deal;
  int total_bet_score = 0;
};

}  // namespace Blackjack

#endif
#include "game.hpp"

#include <compare>

namespace Blackjack {

void Game::deal_initial() {
  // Only one of the dealer's cards is face-up
  move_a_card(table.deck, table.dealer_hand, false);
  move_a_card(table.deck, table.dealer_hand, true);
  move_a_card(table.deck, table.player_hand, false);
  move_a_card(table.deck, table.player_hand, false);
  game_state = get_state_after_deal();
}

GameState Game::get_state_after_deal() const {
  int is_dealer_blackjack =
      (get_values(table.dealer_hand).back() == BLACKJACK_VALUE);
  int is_player_blackjack =
      (get_values(table.player_hand).back() == BLACKJACK_VALUE);

  if (is_dealer_blackjack) {
    if (is_player_blackjack) {
      return GameState::draw;
    } else {
      return GameState::dealer_win;
    }
  } else if (is_player_blackjack) {
    return GameState::player_win;
  } else {
    return GameState::player_to_hit;
  }
}

GameState Game::get_state_after_hit(bool is_player) const {
  // NOTE: a draw is not caught in this method
  // because get_state_after_deal would prevent that earlier
  auto values = get_values(is_player ? table.player_hand : table.dealer_hand);
  // If the player/dealer has hit a value over 21, they lose
  bool has_lost = (values.front() > BLACKJACK_VALUE);
  if (has_lost) {
    GameState lost = is_player ? GameState::dealer_win : GameState::player_win;
    return lost;
  }
  // If the player/dealer has hit a blackjack, they win
  if (std::any_of(values.cbegin(), values.cend(),
                  [](auto i) { return i == BLACKJACK_VALUE; })) {
    GameState won = is_player ? GameState::player_win : GameState::dealer_win;
    return won;
  }
  // If nothing above is true, the game continues
  auto hit = is_player ? GameState::player_to_hit : GameState::dealer_to_hit;
  return hit;
}

GameState Game::get_state_final() const {
  auto player_values = get_values(table.player_hand);
  auto dealer_values = get_values(table.dealer_hand);
  while (player_values.back() > BLACKJACK_VALUE) player_values.pop_back();
  while (dealer_values.back() > BLACKJACK_VALUE) dealer_values.pop_back();

  auto result = player_values.back() <=> dealer_values.back();
  if (result < 0) return GameState::dealer_win;
  if (result > 0) return GameState::player_win;
  return GameState::draw;
}

void Game::player_hit() {
  move_a_card(table.deck, table.player_hand, false);
  game_state = get_state_after_hit(true);
}

void Game::dealer_hit() {
  move_a_card(table.deck, table.dealer_hand, true);
  game_state = get_state_after_hit(false);
}

bool Game::should_dealer_hit() const {
  /* For no aces, the dealer hits if value < 17.
   * For one ace, the dealer hits if max value < 17.
   * For two aces and more, the dealer hits if value < 17, where only one
   * of the aces is considered to be worth 11, and the rest is worth 1
   */
  auto values = get_values(table.dealer_hand);
  auto length = values.size();
  return (game_state == GameState::dealer_to_hit &&
          ((length == 1 && values[0] < DEALER_THRESHOLD) ||
           (length == 2 && values[1] < DEALER_THRESHOLD) ||
           (length == 2 && values[1] > BLACKJACK_VALUE &&
            values[0] < DEALER_THRESHOLD) ||
           (length > 2 && values[1] < DEALER_THRESHOLD) ||
           (length > 2 && values[1] > BLACKJACK_VALUE &&
            values[0] < DEALER_THRESHOLD)));
}

}  // namespace Blackjack
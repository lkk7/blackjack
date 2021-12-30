#include <algorithm>
#include <iostream>
#include <memory>

#include "blackjack/game.hpp"
#include "demo_helpers.hpp"

using namespace DemoHelpers;
using namespace Blackjack;

int main() {
  constexpr unsigned BET_MONEY = 1000;
  std::unique_ptr<Game> game =
      std::make_unique<Game>(Table{Hand{}, Hand{}, StandardDeck{}, BET_MONEY});

  while (true) {
    auto result = play_blackjack(*game);

    // Don't add score in case of a draw
    if (result == GameState::dealer_win) {
      game->total_bet_score -= game->table.bet_money;
    } else if (result == GameState::player_win) {
      game->total_bet_score += game->table.bet_money;
    }

    std::cout << "Your total betting score: " << game->total_bet_score << '\n';

    char answer;
    std::cout << "Play another game? (y/n) ";
    std::cin >> answer;
    if (answer != 'y') {
      return 0;
    }

    game->table = Table{Hand{}, Hand{}, StandardDeck{}, BET_MONEY};
    game->game_state = GameState::yet_to_deal;
  }
}

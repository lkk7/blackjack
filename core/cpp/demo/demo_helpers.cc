#include "demo_helpers.hpp"

#include <iostream>
#include <iterator>

using namespace Blackjack;

namespace DemoHelpers {

void print_hand_cards(const Hand& hand, std::string delimiter,
                      bool show_hidden) {
  std::string delim = "";
  for (const auto& card : hand.cards) {
    std::cout << delim
              << (card.hidden && !show_hidden
                      ? "(hidden)"
                      : std::string(RANK_MAPPINGS.at(card.rank)) + " of " +
                            std::string(SUIT_MAPPINGS.at(card.suit)));
    delim = delimiter;
  }
  std::cout << '\n';
}

void print_card_info(const Table& table, bool show_hidden) {
  std::cout << "Player's cards:\n";
  print_hand_cards(table.player_hand, ", ", show_hidden);
  std::cout << "Dealer's cards:\n";
  print_hand_cards(table.dealer_hand, ", ", show_hidden);
}

void print_game_state(GameState game_state) {
  switch (game_state) {
    case GameState::yet_to_deal:
      std::cout << "The game is yet to begin!\n";
      break;
    case GameState::player_to_hit:
      std::cout << "The player decides whether to hit or not!\n";
      break;
    case GameState::dealer_to_hit:
      std::cout << "The dealer calculates whether to hit or not!\n";
      break;
    case GameState::dealer_win:
      std::cout << "Dealer wins!\n";
      break;
    case GameState::player_win:
      std::cout << "Player wins!\n";
      break;
    case GameState::draw:
      std::cout << "It's a draw!\n";
      break;
  }
}

GameState play_blackjack(Game& game) {
  game.deal_initial();
  print_card_info(game.table);

  while (game.game_state == GameState::player_to_hit) {
    // Ask for a decision
    char answer;
    std::cout << "Hit/stand? (h/s) ";
    std::cin >> answer;
    if (answer != 'h') {
      game.game_state = GameState::dealer_to_hit;
      break;
    }
    game.player_hit();
    print_card_info(game.table);
  }

  print_game_state(game.game_state);
  if (game.game_state != GameState::dealer_to_hit) {
    print_card_info(game.table, true);
    return game.game_state;
  }

  while (game.should_dealer_hit()) {
    std::cout << "Dealer hits!\n";
    game.dealer_hit();
    print_card_info(game.table);
  }

  if (game.game_state != GameState::dealer_to_hit) {
    print_card_info(game.table, true);
    print_game_state(game.game_state);
    return game.game_state;
  }

  game.game_state = game.get_state_final();
  print_card_info(game.table, true);
  print_game_state(game.game_state);
  return game.game_state;
}

}  // namespace DemoHelpers

#include "blackjack/game.hpp"

using namespace Blackjack;

namespace DemoHelpers {

// Print cards from a given hand in a given format
void print_hand_cards(const Hand& hand, std::string delimiter,
                      bool show_hidden = false);

// Print full card information for both hands
void print_card_info(const Table& table, bool show_hidden = false);

// Print the game state info
void print_game_state(GameState game_state);

// Proceed with one full game of blackjack and return its result
GameState play_blackjack(Game& game);

}  // namespace DemoHelpers

#include "card.hpp"

#include <algorithm>
#include <random>

namespace Blackjack {

StandardDeck::StandardDeck(bool shuffle) {
  cards.reserve(NUMBER_OF_CARDS);
  for (int suit_i = 0; suit_i < NUMBER_OF_SUITS; suit_i++) {
    for (int rank_i = 0; rank_i < NUMBER_OF_RANKS; rank_i++) {
      Card card{static_cast<Rank>(rank_i), static_cast<Suit>(suit_i), true};
      cards.emplace_back(std::move(card));
    }
  }
  if (shuffle) {
    static std::random_device random_device;
    static std::mt19937 rand_gen{random_device()};
    std::shuffle(cards.begin(), cards.end(), rand_gen);
  }
}

}  // namespace Blackjack
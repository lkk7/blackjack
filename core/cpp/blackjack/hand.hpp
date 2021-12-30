#ifndef HAND_HPP
#define HAND_HPP

#include <utility>
#include <vector>

#include "card.hpp"

namespace Blackjack {

struct Hand {
 public:
  // Total value of all cards in this hand. Min/max comes from the fact that ace
  // can be worth 1 or 11
  using Values = std::vector<int>;

  std::vector<Card> cards;
};

// Return a sorted vector of possible values
Hand::Values get_values(const Hand& hand);
// Move a card from deck to hand and turn it face-down or face-up
void move_a_card(StandardDeck& deck, Hand& hand, bool make_hidden);

}  // namespace Blackjack

#endif
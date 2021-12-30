#include "hand.hpp"

#include <unordered_map>

namespace Blackjack {

Hand::Values get_values(const Hand& hand) {
  // NOTE: Ace can be worth either 1 or 11
  static const std::unordered_map<Rank, int> value_mappings = {
      {Rank::ace, 1},  {Rank::two, 2},  {Rank::three, 3}, {Rank::four, 4},
      {Rank::five, 5}, {Rank::six, 6},  {Rank::seven, 7}, {Rank::eight, 8},
      {Rank::nine, 9}, {Rank::ten, 10}, {Rank::jack, 10}, {Rank::queen, 10},
      {Rank::king, 10}};

  int base_result = 0, ace_count = 0;
  for (const auto& card : hand.cards) {
    if (card.rank != Rank::ace) {
      base_result += value_mappings.at(card.rank);
    } else {
      ace_count++;
    }
  }
  Hand::Values result{};
  for (int i = 0; i <= ace_count; i++) {
    result.emplace_back(base_result + ace_count + i * 10);
  }
  return result;
}

void move_a_card(StandardDeck& deck, Hand& hand, bool make_hidden) {
  if (!deck.cards.empty()) {
    auto card = std::move(deck.cards.back());
    deck.cards.pop_back();
    card.hidden = make_hidden;
    hand.cards.emplace_back(std::move(card));
  }
}

}  // namespace Blackjack
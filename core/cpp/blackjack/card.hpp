#ifndef CARDS_HPP
#define CARDS_HPP

#include <functional>
#include <string>
#include <unordered_map>
#include <vector>

namespace Blackjack {

struct Card;

inline constexpr int NUMBER_OF_CARDS = 52;
inline constexpr int NUMBER_OF_RANKS = 13;
inline constexpr int NUMBER_OF_SUITS = 4;

// Thirteen possible card ranks
enum class Rank {
  ace,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  jack,
  queen,
  king,
};

// Four possible card suits
enum class Suit { clubs, diamonds, hearts, spades };

// Rank name mappings
inline const std::unordered_map<Rank, std::string> RANK_MAPPINGS = {
    {Rank::ace, "Ace"},     {Rank::two, "Two"},     {Rank::three, "Three"},
    {Rank::four, "Four"},   {Rank::five, "Five"},   {Rank::six, "Six"},
    {Rank::seven, "Seven"}, {Rank::eight, "Eight"}, {Rank::nine, "Nine"},
    {Rank::ten, "Ten"},     {Rank::jack, "Jack"},   {Rank::queen, "Queen"},
    {Rank::king, "King"}};

// Suit name mappings
inline const std::unordered_map<Suit, std::string> SUIT_MAPPINGS = {
    {Suit::clubs, "Clubs"},
    {Suit::diamonds, "Diamonds"},
    {Suit::hearts, "Hearts"},
    {Suit::spades, "Spades"}};

struct Card {
  Card() = default;
  Card(Rank rank, Suit suit, bool hidden)
      : rank(rank), suit(suit), hidden(hidden) {}
  bool operator==(const Card& other) const {
    return (rank == other.rank && suit == other.suit);
  }

  Rank rank = Rank::ace;
  Suit suit = Suit::clubs;
  // Whether the card is face-down (value not visible) or face-up
  bool hidden;
};

struct StandardDeck {
  // Turns all cards face-down
  StandardDeck(bool shuffle = true);

  std::vector<Card> cards;
};

}  // namespace Blackjack

// Specialization of std::hash for the Card struct - necessary for testing
namespace std {
template <>
struct hash<Blackjack::Card> {
  size_t operator()(const Blackjack::Card& card) const noexcept {
    return std::hash<int>{}(static_cast<int>(card.rank)) +
           (std::hash<int>{}(static_cast<int>(card.suit)) * 16);
  }
};
}  // namespace std

#endif
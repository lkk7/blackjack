#include <pybind11/operators.h>
#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include <pybind11/stl_bind.h>

#include "blackjack/game.hpp"

namespace py = pybind11;
using namespace Blackjack;

inline constexpr auto MODULE_NAME = "cppcore";

PYBIND11_MAKE_OPAQUE(std::vector<Card>)

PYBIND11_MODULE(cppcore, m) {
  m.doc() = "Blackjack core module created from c++ with pybind11";

  // --- Card ---
  m.attr("NUMBER_OF_CARDS") = NUMBER_OF_CARDS;
  m.attr("NUMBER_OF_RANKS") = NUMBER_OF_RANKS;
  m.attr("NUMBER_OF_SUITS") = NUMBER_OF_SUITS;
  py::enum_<Rank>(m, "Rank")
      .value("ace", Rank::ace)
      .value("two", Rank::two)
      .value("three", Rank::three)
      .value("four", Rank::four)
      .value("five", Rank::five)
      .value("six", Rank::six)
      .value("seven", Rank::seven)
      .value("eight", Rank::eight)
      .value("nine", Rank::nine)
      .value("ten", Rank::ten)
      .value("jack", Rank::jack)
      .value("queen", Rank::queen)
      .value("king", Rank::king);
  py::enum_<Suit>(m, "Suit")
      .value("clubs", Suit::clubs)
      .value("diamonds", Suit::diamonds)
      .value("hearts", Suit::hearts)
      .value("spades", Suit::spades);
  m.attr("RANK_MAPPINGS") = RANK_MAPPINGS;
  m.attr("SUIT_MAPPINGS") = SUIT_MAPPINGS;
  py::class_<Card>(m, "Card")
      .def(py::init())
      .def(py::init<Rank, Suit, bool>())
      .def(py::self == py::self)
      .def_readwrite("rank", &Card::rank)
      .def_readwrite("suit", &Card::suit)
      .def_readwrite("hidden", &Card::hidden)
      .def("__repr__", [](const Card& card) {
        return std::string("<") + MODULE_NAME +
               ".Card: " + RANK_MAPPINGS.at(card.rank) + " of " +
               SUIT_MAPPINGS.at(card.suit) + " (" +
               (card.hidden ? "hidden" : "visible") + ")>";
      });
  py::class_<StandardDeck>(m, "StandardDeck")
      // Note: unlike in cpp version, there's no default argument
      .def(py::init<bool>())
      .def_readwrite("cards", &StandardDeck::cards)
      .def("__repr__", [](const StandardDeck& deck) {
        return std::string("<") + MODULE_NAME +
               ".StandardDeck: " + std::to_string(deck.cards.size()) +
               " cards>";
      });

  // --- Hand ---
  py::bind_vector<std::vector<Card>>(m, "CardVector");
  py::class_<Hand>(m, "Hand")
      .def(py::init())
      .def_readwrite("cards", &Hand::cards)
      .def("__repr__", [](const Hand& hand) {
        std::string cards_str;
        std::string delim{};
        for (const auto& card : hand.cards) {
          cards_str += delim + RANK_MAPPINGS.at(card.rank) + " of " +
                       SUIT_MAPPINGS.at(card.suit) + " (" +
                       (card.hidden ? "hidden" : "visible") + ')';
          delim = ", ";
        }
        if (cards_str.empty()) {
          cards_str = "empty";
        }
        return std::string("<") + MODULE_NAME + ".Hand: " + cards_str + ">";
      });
  m.def("get_values", &get_values);
  m.def("move_a_card", &move_a_card);

  // --- Game ---
  m.attr("BLACKJACK_VALUE") = BLACKJACK_VALUE;
  m.attr("DEALER_THRESHOLD") = DEALER_THRESHOLD;
  py::enum_<GameState>(m, "GameState")
      .value("yet_to_deal", GameState::yet_to_deal)
      .value("player_to_hit", GameState::player_to_hit)
      .value("dealer_to_hit", GameState::dealer_to_hit)
      .value("player_win", GameState::player_win)
      .value("dealer_win", GameState::dealer_win)
      .value("draw", GameState::draw);
  py::class_<Table>(m, "Table")
      .def(py::init())
      .def(py::init<Hand, Hand, StandardDeck, unsigned>())
      .def_readwrite("player_hand", &Table::player_hand)
      .def_readwrite("dealer_hand", &Table::dealer_hand)
      .def_readwrite("deck", &Table::deck)
      .def_readwrite("bet_money", &Table::bet_money);
  py::class_<Game>(m, "Game")
      .def(py::init())
      .def(py::init<Table>())
      .def("deal_initial", &Game::deal_initial)
      .def("get_state_after_deal", &Game::get_state_after_deal)
      .def("get_state_after_hit", &Game::get_state_after_hit)
      .def("get_state_final", &Game::get_state_final)
      .def("player_hit", &Game::player_hit)
      .def("dealer_hit", &Game::dealer_hit)
      .def("should_dealer_hit", &Game::should_dealer_hit)
      .def_readwrite("table", &Game::table)
      .def_readwrite("game_state", &Game::game_state)
      .def_readwrite("total_bet_score", &Game::total_bet_score);
}
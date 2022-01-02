import pytest
import cpp_module.cppcore as cpp
from api.blackjack.conversions import game_to_dict, dict_to_game, GameDict


@pytest.fixture()
def game() -> cpp.Game:
    """Create a test game with a test state.
    Note: that state would be invalid in a normal game.
    """

    def card(rank: int, suit: int, hidden: bool):
        return cpp.Card(cpp.Rank(rank), cpp.Suit(suit), hidden)

    cpp_game = cpp.Game(
        cpp.Table(cpp.Hand(), cpp.Hand(), cpp.StandardDeck(True), 1000)
    )
    cpp_game.total_bet_score = 1234
    cpp_game.table.bet_money = 123
    cpp_game.game_state = cpp.GameState(2)
    cpp_game.table.player_hand.cards = cpp.CardVector(
        [card(0, 0, False), card(9, 1, False)]
    )
    cpp_game.table.dealer_hand.cards = cpp.CardVector(
        [card(7, 2, False), card(1, 3, True)]
    )
    cpp_game.table.deck.cards = cpp.CardVector(
        [card(i, 0, False) for i in range(48)]
    )
    return cpp_game


@pytest.fixture()
def game_dict(game: cpp.Game) -> GameDict:
    return game_to_dict(game)


def test_game_to_dict(game_dict: GameDict):
    assert game_dict == {
        "total": 1234,
        "bet": 123,
        "state": 2,
        "playerHand": [
            {"rank": 0, "suit": 0, "hidden": False},
            {"rank": 9, "suit": 1, "hidden": False},
        ],
        "dealerHand": [
            {"rank": 7, "suit": 2, "hidden": False},
            {"rank": 1, "suit": 3, "hidden": True},
        ],
        "deck": [{"rank": i, "suit": 0, "hidden": False} for i in range(48)],
    }


def test_dict_to_game(game: cpp.Game, game_dict: GameDict):
    converted: cpp.Game = dict_to_game(game_dict)
    assert (
        game.game_state == converted.game_state
        and game.total_bet_score == converted.total_bet_score
        and game.table.bet_money == converted.table.bet_money
        and game.table.player_hand.cards == converted.table.player_hand.cards
        and game.table.dealer_hand.cards == converted.table.dealer_hand.cards
        and game.table.deck.cards == converted.table.deck.cards
    )

from typing import TypedDict, List
import cpp_module.cppcore as cpp


class CardDict(TypedDict):
    """Dict form of a card object from cpp."""

    rank: int
    suit: int
    hidden: bool


class GameDict(TypedDict):
    """Dict form of a game object from cpp."""

    total: int
    bet: int
    state: int
    # Variable naming convention is broken, but this is done for JS.
    playerHand: List[CardDict]
    dealerHand: List[CardDict]
    deck: List[CardDict]


def game_to_dict(game: cpp.Game) -> GameDict:
    """Convert game into a dictionary (easily convertible to JSON)."""
    result = {
        "total": game.total_bet_score,
        "bet": game.table.bet_money,
        "state": game.game_state.value,
    }
    for cards_key, card_list in [
        ("playerHand", game.table.player_hand.cards),
        ("dealerHand", game.table.dealer_hand.cards),
        ("deck", game.table.deck.cards),
    ]:
        result[cards_key] = [
            {
                "rank": card.rank.value,
                "suit": card.suit.value,
                "hidden": card.hidden,
            }
            for card in card_list
        ]
    return result


def dict_to_game(game_dict: dict) -> cpp.Game:
    """Convert a game dictionary into a Game object."""
    game = cpp.Game(
        cpp.Table(
            cpp.Hand(),
            cpp.Hand(),
            cpp.StandardDeck(True),
            game_dict["bet"],
        )
    )
    game.total_bet_score = game_dict["total"]
    game.game_state = cpp.GameState(game_dict["state"])
    for card_list, key in (
        (game.table.player_hand, "playerHand"),
        (game.table.dealer_hand, "dealerHand"),
        (game.table.deck, "deck"),
    ):
        card_list.cards = cpp.CardVector(
            [
                cpp.Card(
                    cpp.Rank(card["rank"]),
                    cpp.Suit(card["suit"]),
                    card["hidden"],
                )
                for card in game_dict[key]
            ]
        )

    return game

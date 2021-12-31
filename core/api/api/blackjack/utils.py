import cpp_module.cppcore as cpp


def game_to_dict(game: cpp.Game) -> dict:
    """Convert game into a dictionary (easily convertible to JSON)."""
    result = {
        "total": game.total_bet_score,
        "bet": game.table.bet_money,
        "state": game.game_state.value,
    }
    for cards_key, cards_list in [
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
            for card in cards_list
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
    for cards_list, key in (
        (game.table.player_hand, "playerHand"),
        (game.table.dealer_hand, "dealerHand"),
        (game.table.deck, "deck"),
    ):
        cards_list.cards = cpp.CardVector(
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


bet_money = 1000
game = cpp.Game(
    cpp.Table(cpp.Hand(), cpp.Hand(), cpp.StandardDeck(True), bet_money)
)
game.deal_initial()

game_dict = game_to_dict(game)
# for key in game_dict.keys():
#     print(key, game_dict[key])

game_second = dict_to_game(game_dict)
game_second_dict = game_to_dict(game_second)
for key in game_second_dict.keys():
    print(key, game_second_dict[key])

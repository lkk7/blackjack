import cpp_module.cppcore as cpp


def print_game_full(game: cpp.Game):
    """Print a full game state for debugging purposes."""
    game.deal_initial()
    print(
        f"Total betting score:\n{game.total_bet_score}\n"
        f"Current bet:\n{game.table.bet_money}\n"
        f"State:\n{game.game_state.value} => {game.game_state}\n"
        f"Deck:\n{game.table.deck}"
    )
    print(
        "Player's hand:\n",
        [
            (card.rank, card.suit, card.hidden)
            for card in game.table.player_hand.cards
        ],
    )
    print(
        "Dealer's hand:\n",
        [
            (card.rank, card.suit, card.hidden)
            for card in game.table.dealer_hand.cards
        ],
    )


bet_money = 1000
game = cpp.Game(
    cpp.Table(cpp.Hand(), cpp.Hand(), cpp.StandardDeck(True), bet_money)
)

print_game_full(game)

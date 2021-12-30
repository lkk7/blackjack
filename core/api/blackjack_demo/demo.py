import cpp_module.cppcore as cpp
from demo_helpers import play_blackjack


def demo_main():
    bet_money = 1000
    game = cpp.Game(
        cpp.Table(cpp.Hand(), cpp.Hand(), cpp.StandardDeck(True), bet_money)
    )

    while True:
        result = play_blackjack(game)
        if result == cpp.GameState.dealer_win:
            game.total_bet_score -= game.table.bet_money
        elif result == cpp.GameState.player_win:
            game.total_bet_score += game.table.bet_money

        print("Your total betting score: {}".format(game.total_bet_score))
        answer = input("Play another game? (y/n) ")
        if answer != "y":
            return

        game.table = cpp.Table(
            cpp.Hand(), cpp.Hand(), cpp.StandardDeck(True), bet_money
        )
        game.game_state = cpp.GameState.yet_to_deal


if __name__ == "__main__":
    demo_main()

import cpp_module.cppcore as cpp


def get_new_game(bet_money: int = 1000) -> cpp.Game:
    game = cpp.Game(
        cpp.Table(cpp.Hand(), cpp.Hand(), cpp.StandardDeck(True), bet_money)
    )
    game.deal_initial()
    return game


def get_restarted_game(game: cpp.Game, bet_money: int = 1000):
    last_score = game.total_bet_score
    if game.game_state in (
        cpp.GameState.yet_to_deal,
        cpp.GameState.player_to_hit,
        cpp.GameState.dealer_to_hit,
    ):
        last_score -= game.table.bet_money
    game = get_new_game()
    game.total_bet_score = last_score
    return game


def play_out(game: cpp.Game):
    game.game_state = cpp.GameState.dealer_to_hit
    while game.should_dealer_hit():
        game.dealer_hit()
    if game.game_state != cpp.GameState.dealer_to_hit:
        return
    game.game_state = game.get_state_final()

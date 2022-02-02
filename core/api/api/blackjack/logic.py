from .conversions import GameDict
import cpp_module.cppcore as cpp

STATES_LOSING_ON_RESTART = (
    cpp.GameState.yet_to_deal,
    cpp.GameState.player_to_hit,
    cpp.GameState.dealer_to_hit,
)


def get_new_game(bet_money: int = 1000) -> cpp.Game:
    """Return a clean new game with cards dealt."""
    game = cpp.Game(
        cpp.Table(cpp.Hand(), cpp.Hand(), cpp.StandardDeck(True), bet_money)
    )
    game.deal_initial()
    return game


def get_restarted_game(game: cpp.Game, bet_money: int = 1000) -> cpp.Game:
    """Restart an existing game, handling the score if it's a surrender."""
    last_score = game.total_bet_score
    if game.game_state in STATES_LOSING_ON_RESTART:
        last_score -= game.table.bet_money
    game = get_new_game()
    game.total_bet_score = last_score
    return game


def play_out(game: cpp.Game):
    """Play out the dealer's part of the game and set the final score."""
    game.game_state = cpp.GameState.dealer_to_hit
    while game.should_dealer_hit():
        game.dealer_hit()
    if game.game_state != cpp.GameState.dealer_to_hit:
        return
    game.game_state = game.get_state_final()


def handle_score(game: cpp.Game):
    """Handle the game's score (add/subtract/nothing) based on its state."""
    if game.game_state == cpp.GameState.dealer_win:
        game.total_bet_score -= game.table.bet_money
    elif game.game_state == cpp.GameState.player_win:
        game.total_bet_score += game.table.bet_money


def handle_hidden_cards(game_dict: GameDict) -> GameDict:
    """Return the given game with hidden cards set to rank 0 and suit 0.
    The client can't see the real information in the response then.
    However, make all cards visible if the game is over."""
    if game_dict["state"] in (3, 4, 5):
        for hand in ("dealerHand", "playerHand"):
            for card in game_dict[hand]:
                card["hidden"] = False
        return game_dict

    for hand in ("dealerHand", "playerHand"):
        for card in game_dict[hand]:
            if card["hidden"]:
                card["rank"] = 0
                card["suit"] = 0

    return game_dict

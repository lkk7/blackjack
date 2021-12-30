import cpp_module.cppcore as cpp
from typing import Callable


def print_separated(printing_func: Callable,
                    separator: str = "--------------------"):
    def print_separated_wrapper(*args, **kwargs):
        print(separator)
        printing_func(*args, **kwargs)
    return print_separated_wrapper


def print_hand_cards(hand: cpp.Hand, delimiter: str, show_hidden: bool):
    print(delimiter.join(map(
        lambda card: '(hidden)' if card.hidden and not show_hidden else
        cpp.RANK_MAPPINGS[card.rank] + ' of ' + cpp.SUIT_MAPPINGS[card.suit],
        hand.cards)))


@print_separated
def print_card_info(table: cpp.Table, show_hidden: bool):
    print("Player's cards:")
    print_hand_cards(table.player_hand, ', ', show_hidden)
    print("Dealer's cards:")
    print_hand_cards(table.dealer_hand, ', ', show_hidden)


@print_separated
def print_game_state(game_state: cpp.GameState):
    match game_state:
        case cpp.GameState.yet_to_deal:
            print("The game is yet to begin!")
        case cpp.GameState.player_to_hit:
            print("The player decides whether to hit or not!")
        case cpp.GameState.dealer_to_hit:
            print("The dealers calculates whether to hit or not!")
        case cpp.GameState.dealer_win:
            print("Dealer wins!")
        case cpp.GameState.player_win:
            print("Player wins!")
        case cpp.GameState.draw:
            print("It's a draw!")


def play_blackjack(game: cpp.Game):
    game.deal_initial()
    print_card_info(game.table, False)

    while game.game_state == cpp.GameState.player_to_hit:
        answer = input("Hit/stand? (h/s) ")
        if answer != 'h':
            game.game_state = cpp.GameState.dealer_to_hit
            break

        game.player_hit()
        print_card_info(game.table, False)

    print_game_state(game.game_state)
    if game.game_state != cpp.GameState.dealer_to_hit:
        print_card_info(game.table, True)
        return game.game_state

    while game.should_dealer_hit():
        print("Dealer hits!")
        game.dealer_hit()
        print_card_info(game.table, False)

    if game.game_state != cpp.GameState.dealer_to_hit:
        print_card_info(game.table, True)
        print_game_state(game.game_state)
        return game.game_state

    game.game_state = game.get_state_final()
    print_card_info(game.table, True)
    print_game_state(game.game_state)
    return game.game_state

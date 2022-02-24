from typing import List
from pydantic import BaseModel


class Card(BaseModel):
    """Just a card.

    Example: Two of Diamonds, hidden (not visible to the player).
    """

    rank: int
    suit: int
    hidden: bool


class GameState(BaseModel):
    """A game state containing everything needed to recreate a cpp game object.
    Additionally it has a gameId for game identification in Redis.
    (Note: we omit the deck because it isn't meant to be sent to the client)
    """

    gameId: str
    total: int
    bet: int
    state: int
    playerHand: List[Card]
    dealerHand: List[Card]

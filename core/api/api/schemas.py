from typing import List
from pydantic import BaseModel


class Card(BaseModel):
    rank: int
    suit: int
    hidden: bool


class GameState(BaseModel):
    gameId: bytes
    total: int
    bet: int
    state: int
    playerHand: List[Card]
    dealerHand: List[Card]
    deck: List[Card]

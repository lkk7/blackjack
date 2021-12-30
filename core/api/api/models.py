from pydantic import BaseModel


class GameInfo(BaseModel):
    gameId: str

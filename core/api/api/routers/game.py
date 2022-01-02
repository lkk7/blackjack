import json
from secrets import token_urlsafe
from fastapi import APIRouter, HTTPException, Path, Request, status
from fastapi.param_functions import Depends
from api.schemas import GameState
from api.blackjack.conversions import game_to_dict
from api.redis import Redis
import api.redis as redis
import cpp_module.cppcore as cpp


router = APIRouter()


@router.get("/game/new", response_model=GameState)
async def get_new_game(redis: Redis = Depends(redis.wrapper.get)):
    game_id = token_urlsafe(32)
    bet_money = 1000
    game = cpp.Game(
        cpp.Table(cpp.Hand(), cpp.Hand(), cpp.StandardDeck(True), bet_money)
    )
    game.deal_initial()
    game_dict = game_to_dict(game)

    await redis.set(game_id, json.dumps(game_dict))
    return GameState(gameId=game_id, **game_dict)


@router.get("/game/{game_id}/", response_model=GameState)
async def get_game(
    game_id: str = Path(...), redis: Redis = Depends(redis.wrapper.get)
):
    return GameState(gameId=game_id, **json.loads(await redis.get(game_id)))

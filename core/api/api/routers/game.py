import json
from secrets import token_urlsafe
from fastapi import APIRouter, HTTPException, Path, Request, status
from fastapi.param_functions import Depends
from api.models import GameInfo
import api.redis as redis
import cpp_module.cppcore as cpp


router = APIRouter()


@router.get("/game/new", response_model=GameInfo)
async def get_new_game(request: Request, redis=Depends(redis.wrapper.get)):
    if not request.client.host:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Somehow couldn't get the client's hostname",
        )

    game_id = token_urlsafe(32)
    await redis.set(request.client.host, game_id)

    bet_money = 1000
    game = cpp.Game(
        cpp.Table(cpp.Hand(), cpp.Hand(), cpp.StandardDeck(True), bet_money)
    )
    print((list(game.table.player_hand.cards)))

    await redis.set(game_id, json.dumps({"x": "y"}))
    return GameInfo(gameId=game_id)


@router.get("/game/{game_id}/", response_model=str)
async def get_game_info(
    game_id: str = Path(...), redis=Depends(redis.wrapper.get)
):
    return await redis.get(game_id)


@router.get("/game/{game_id}/exists", response_model=bool)
async def does_game_exist(
    game_id: str = Path(...), redis=Depends(redis.wrapper.get)
):
    return bool(await redis.exists(game_id))

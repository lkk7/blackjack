import json
from fastapi import HTTPException, status
from api.redis import Redis
from .conversions import dict_to_game
import cpp_module.cppcore as cpp


async def get_game_by_id(redis: Redis, game_id: str) -> cpp.Game:
    game_str: str | None = await redis.get(game_id)
    if not game_str:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return dict_to_game(json.loads(game_str))

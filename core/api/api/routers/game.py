import json
from secrets import token_urlsafe
from fastapi import APIRouter, Path, HTTPException, status
from fastapi.param_functions import Depends
from api.schemas import GameState
from api.blackjack.conversions import game_to_dict
from api.blackjack.logic import (
    get_new_game,
    get_restarted_game,
    play_out,
    handle_score,
    handle_hidden_cards
)
from api.blackjack.utils import get_game_by_id
from api.redis import Redis
import api.redis as redis
import cpp_module.cppcore as cpp


router = APIRouter()


@router.post("/new", response_model=GameState)
async def create_new_game(redis: Redis = Depends(redis.wrapper.get)):
    """Create a new game with an unique ID."""
    game = get_new_game()
    handle_score(game)
    game_dict = handle_hidden_cards(game_to_dict(game))
    game_id = token_urlsafe(32)
    await redis.set(game_id, json.dumps(game_dict))
    return GameState(gameId=game_id, **game_dict)


@router.get("/{game_id}/", response_model=GameState)
async def get_game(
    game_id: str = Path(...), redis: Redis = Depends(redis.wrapper.get)
):
    """Get a game's state."""
    game_str: str | None = await redis.get(game_id)
    if not game_str:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return GameState(gameId=game_id, **json.loads(game_str))


@router.post("/{game_id}/restart", response_model=GameState)
async def restart_game(
    game_id: str = Path(...), redis: Redis = Depends(redis.wrapper.get)
):
    """Restart a game without changing its ID."""
    game = await get_game_by_id(redis, game_id)
    game = get_restarted_game(game)
    handle_score(game)
    game_dict = handle_hidden_cards(game_to_dict(game))
    await redis.set(game_id, json.dumps(game_dict))
    return GameState(gameId=game_id, **game_dict)


@router.post("/{game_id}/hit", response_model=GameState)
async def player_hit(
    game_id: str = Path(...), redis: Redis = Depends(redis.wrapper.get)
):
    """Make a 'hit' move as a player (if it's possible)."""
    game = await get_game_by_id(redis, game_id)
    if game.game_state != cpp.GameState.player_to_hit:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="It's not your turn to hit",
        )
    game.player_hit()
    handle_score(game)
    game_dict = handle_hidden_cards(game_to_dict(game))
    await redis.set(game_id, json.dumps(game_dict))
    return GameState(gameId=game_id, **game_dict)


@router.post("/{game_id}/stand", response_model=GameState)
async def player_stand(
    game_id: str = Path(...), redis: Redis = Depends(redis.wrapper.get)
):
    """Make a 'stand' move as a player (if it's possible)."""
    game = await get_game_by_id(redis, game_id)
    if game.game_state != cpp.GameState.player_to_hit:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="It's not your turn to stand",
        )
    play_out(game)
    handle_score(game)
    game_dict = handle_hidden_cards(game_to_dict(game))
    await redis.set(game_id, json.dumps(game_dict))
    return GameState(gameId=game_id, **game_dict)

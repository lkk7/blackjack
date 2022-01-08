from fastapi import FastAPI
from . import redis
from .routers import game


app = FastAPI()
app.include_router(game.router, prefix='/game')

app.on_event("startup")(redis.wrapper.create_redis)
app.on_event("shutdown")(redis.wrapper.close_redis)


@app.get("/", response_model=bool)
async def root():
    """Ping the API."""
    return True

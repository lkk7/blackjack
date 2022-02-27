from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import redis
from .routers import game


app = FastAPI()
app.include_router(game.router, prefix="/game")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://localhost:3000",
        "http://127.0.0.1:3000",
        "https://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Start/close Redis connection on app startup/shutdown.
app.on_event("startup")(redis.wrapper.create_redis)
app.on_event("shutdown")(redis.wrapper.close_redis)


@app.get("/", response_model=bool)
async def root():
    """Ping the API."""
    return True

from random import randrange
from fastapi import FastAPI, Path
from pydantic import BaseModel, Field
from .redis import RedisWrapper
import cpp_module.cppcore as cpp

app = FastAPI()
redis = RedisWrapper()

app.on_event("startup")(redis.create_redis)
app.on_event("shutdown")(redis.close_redis)


@app.get("/")
async def root():
    return {
        "message": "Success! Blackjack value: {}".format(cpp.BLACKJACK_VALUE),
        "redisWorks": await redis.conn.ping(),
    }


@app.get("/testredis")
async def test_redis():
    await redis.conn.set("random-value", "randomValue" + str(randrange(100)))
    test_value = await redis.conn.get("random-value")
    return {"random-value": test_value}

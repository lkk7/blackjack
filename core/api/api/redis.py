import aioredis


class RedisWrapper:
    def __init__(self):
        self.conn: aioredis.Redis = None

    async def create_redis(self):
        self.conn = aioredis.from_url(
            "redis://redis", encoding="utf-8", decode_responses=True
        )

    async def close_redis(self):
        await self.conn.close()
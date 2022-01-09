import aioredis
from aioredis import Redis


class RedisWrapper:
    """A Redis wrapper class for usage in FastAPI endpoints."""

    def __init__(self):
        self.conn: Redis = None

    async def create_redis(self):
        """Close the connection. Use at server startup."""
        self.conn = aioredis.from_url(
            "redis://redis", encoding="utf-8", decode_responses=True
        )

    async def close_redis(self):
        """Close the connection. Use at server shutdown."""
        await self.conn.close()

    def get(self):
        """Return the connection for actual usage.
        This is the method to use as a dependency in FastAPI endpoints.
        """
        return self.conn


wrapper = RedisWrapper()

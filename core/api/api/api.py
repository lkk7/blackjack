from typing import Optional
import cpp_module.cppcore as cpp
from fastapi import FastAPI, Path
from pydantic import BaseModel, Field


app = FastAPI()


@app.get("/")
async def root():
    return {
        "message": "Success! Blackjack value: {}".format(cpp.BLACKJACK_VALUE)
    }


@app.get("/ab/{x}")
async def get_something(
    x: float = Path(..., title="X", description="This is an x.", ge=1.5)
):
    return {"x": x}


class Item(BaseModel):
    name: str = Field(..., example="Example Name")
    description: Optional[str] = None
    price: Optional[int] = Field(None, example="X")

    class Config:
        schema_extra = {"example": {"description": "A good description"}}


@app.get("/post")
async def get_x(
    x: Optional[Item] = Item(name="xd", description="A description!")
):
    return {"x": x}

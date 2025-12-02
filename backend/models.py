from typing import Optional
from pydantic import BaseModel, Field

class TaskSchema(BaseModel):
    text: str = Field(...)
    completed: bool = Field(False)

    class Config:
        json_schema_extra = {
            "example": {
                "text": "Buy groceries",
                "completed": False
            }
        }

class UpdateTaskModel(BaseModel):
    text: Optional[str]
    completed: Optional[bool]

    class Config:
        json_schema_extra = {
            "example": {
                "text": "Buy groceries",
                "completed": True
            }
        }

def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

class UserSchema(BaseModel):
    email: str = Field(...)
    name: str = Field(...)
    picture: Optional[str] = Field(None)
    google_id: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "name": "John Doe",
                "picture": "https://example.com/avatar.jpg",
                "google_id": "1234567890"
            }
        }

def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}

import os
from fastapi import APIRouter, Body, HTTPException
from google.oauth2 import id_token
from google.auth.transport import requests
from database import user_collection
from models import ResponseModel, UserSchema, ErrorResponseModel

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "YOUR_GOOGLE_CLIENT_ID_HERE")

@router.post("/google", response_description="Google Login")
async def google_login(credential: dict = Body(...)):
    token = credential.get("credential")
    if not token:
        return ErrorResponseModel("Missing credential", 400, "Token is required")

    try:
        # Verify the token
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)

        # ID token is valid. Get the user's Google Account ID from the decoded token.
        userid = idinfo['sub']
        email = idinfo['email']
        name = idinfo.get('name')
        picture = idinfo.get('picture')

        # Check if user exists
        user = await user_collection.find_one({"google_id": userid})
        
        if not user:
            # Create new user
            new_user = {
                "email": email,
                "name": name,
                "picture": picture,
                "google_id": userid
            }
            await user_collection.insert_one(new_user)
            user = await user_collection.find_one({"google_id": userid})

        user["id"] = str(user["_id"])
        del user["_id"]
        
        return ResponseModel(user, "Login successful")

    except ValueError:
        # Invalid token
        return ErrorResponseModel("Invalid token", 401, "Could not verify Google token")
    except Exception as e:
        return ErrorResponseModel(str(e), 500, "Internal Server Error")

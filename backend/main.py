from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router as TaskRouter
from auth import router as AuthRouter

app = FastAPI()

# CORS setup
origins = [
    "http://localhost",
    "http://localhost:4200",  # Angular default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(TaskRouter, tags=["Task"], prefix="/task")
app.include_router(AuthRouter, tags=["Auth"], prefix="/auth")

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to Insomnia Backend"}

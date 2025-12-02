from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from database import (
    task_collection,
)
from models import (
    ErrorResponseModel,
    ResponseModel,
    TaskSchema,
    UpdateTaskModel,
)

router = APIRouter()

@router.post("/", response_description="Task data added into the database")
async def add_task_data(task: TaskSchema = Body(...)):
    task = jsonable_encoder(task)
    new_task = await task_collection.insert_one(task)
    created_task = await task_collection.find_one({"_id": new_task.inserted_id})
    # Convert ObjectId to string for response
    if created_task:
        created_task["id"] = str(created_task["_id"])
        del created_task["_id"]
    return ResponseModel(created_task, "Task added successfully.")

@router.get("/", response_description="Tasks retrieved")
async def get_tasks():
    tasks = []
    async for task in task_collection.find():
        task["id"] = str(task["_id"])
        del task["_id"]
        tasks.append(task)
    return ResponseModel(tasks, "Tasks data retrieved successfully")

@router.get("/{id}", response_description="Task data retrieved")
async def get_task_data(id: str):
    from bson.objectid import ObjectId
    try:
        task = await task_collection.find_one({"_id": ObjectId(id)})
    except:
        return ErrorResponseModel("An error occurred", 404, "Task doesn't exist.")
        
    if task:
        task["id"] = str(task["_id"])
        del task["_id"]
        return ResponseModel(task, "Task data retrieved successfully")
    return ErrorResponseModel("An error occurred", 404, "Task doesn't exist.")

@router.put("/{id}")
async def update_task_data(id: str, req: UpdateTaskModel = Body(...)):
    from bson.objectid import ObjectId
    req = {k: v for k, v in req.dict().items() if v is not None}
    
    try:
        updated_task = await task_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": req}
        )
    except:
        return ErrorResponseModel("An error occurred", 404, "Task doesn't exist.")

    if updated_task.modified_count == 1:
        return ResponseModel("Task with ID: {} name update is successful".format(id), "Task name updated successfully")
    
    # If no modification (e.g. same data), check if it exists
    existing_task = await task_collection.find_one({"_id": ObjectId(id)})
    if existing_task:
         return ResponseModel("Task with ID: {} name update is successful".format(id), "Task name updated successfully")

    return ErrorResponseModel("An error occurred", 404, "Task with id {0} doesn't exist".format(id))

@router.delete("/{id}", response_description="Task data deleted from the database")
async def delete_task_data(id: str):
    from bson.objectid import ObjectId
    try:
        delete_result = await task_collection.delete_one({"_id": ObjectId(id)})
    except:
         return ErrorResponseModel("An error occurred", 404, "Task doesn't exist.")

    if delete_result.deleted_count == 1:
        return ResponseModel("Task with ID: {} removed".format(id), "Task deleted successfully")

    return ErrorResponseModel("An error occurred", 404, "Task with id {0} doesn't exist".format(id))

import { Router } from "express";
import { taskController } from "./Task.Controller";
import { createValidator, updateValidator } from "./task.validator";


export const taskRouter: Router = Router();

taskRouter.get("/tasks", taskController.getAll);

taskRouter.post("/tasks", createValidator, taskController.create);
taskRouter.put("/tasks", updateValidator, taskController.updateTask);

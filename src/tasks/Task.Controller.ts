import { AppSource } from "../../index";
import { Task } from "./Task.Entity";
import { Request, Response } from "express";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validationResult } from "express-validator";
import { UpdateResult } from "typeorm";

class TasksController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    let allTasks: Task[];

    try {
      allTasks = await AppSource.getRepository(Task).find({
        order: {
          date: "ASC",
        },
      });

      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);
    } catch (error) {
      console.error(error);
      return res.json("Internal Server Error").status(500);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const error = validationResult(req);
    let createdNewRepo: Task;
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const newTask = new Task();
    newTask.title = req.body.title;
    newTask.description = req.body.description;
    newTask.date = req.body.date;
    newTask.status = req.body.Status;
    newTask.priority = req.body.Status;

    try {
      createdNewRepo = await AppSource.getRepository(Task).save(newTask);

      createdNewRepo = instanceToPlain(createdNewRepo) as Task;

      return res.json({ msg: "Success", createdNewRepo }).status(201);
    } catch (error) {
      return res.json("Internal server Error").status(500);
    }
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json({ error: error.array() }).status(404);
    }

    let task: Task | null;

    try {
      task = await AppSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });
    } catch (error) {
      return res.json("internal server error").status(500);
    }

    try {
      if (!task) {
        return res
          .json({ error: "the Task Id does not exist in the database " })
          .status(404);
      }

      let updatedTask: UpdateResult;
      updatedTask = await AppSource.getRepository(Task).update(
        req.body.id,
        plainToInstance(Task, {
          status: req.body.status,
        })
      );

      updatedTask = instanceToPlain(updatedTask) as UpdateResult
      return res.json(updatedTask).status(200)
    } catch (error) {
      return res.json("internal server error").status(500);
    }
  }
}

export const taskController = new TasksController();

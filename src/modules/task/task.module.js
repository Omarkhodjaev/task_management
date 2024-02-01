import { Router } from "express";
import { TaskService } from "./task.service.js";
import { TaskController } from "./task.controller.js";
import { TaskRepository } from "./task.repository.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const taskService = new TaskService();
const taskRepository = new TaskRepository();
const taskController = new TaskController(taskService, taskRepository);

const authorizationMiddleware = new AuthorizationMiddleware();

router.post("/create", (req, res) => {
  taskController.create(req, res);
});

router.get(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  (req, res) => {
    taskController.getAll(req, res);
  }
);

router.put("/:id", (req, res) => {
  taskController.update(req, res);
});

router.get("/:id", (req, res) => {
  taskController.getById(req, res);
});

router.delete("/:id", (req, res) => {
  taskController.delete(req, res);
});

export default { router };

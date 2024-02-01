import { Router } from "express";
import { UserTaskController } from "./user_task.controller.js";
import { UserTaskService } from "./user_task.service.js";
import { UserTaskRepository } from "./user_task.repository.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";
import { UserService } from "../user/user.service.js";
import { TaskService } from "../task/task.service.js";
const router = Router();

const userTaskService = new UserTaskService();
const userTaskRepository = new UserTaskRepository();
const userService = new UserService();
const taskService = new TaskService();
const userTaskController = new UserTaskController(
  userTaskService,
  userTaskRepository,
  userService,
  taskService
);

const authorizationMiddleware = new AuthorizationMiddleware();

router.post("/create", (req, res) => {
  userTaskController.create(req, res);
});

router.get("/", (req, res) => {
  userTaskController.getAll(req, res);
});

router.put("/:id", (req, res) => {
  userTaskController.update(req, res);
});

router.get("/:id", (req, res) => {
  userTaskController.getById(req, res);
});

router.get("/:id", (req, res) => {
  userTaskController.getByTaskId(req, res);
});

router.get("/:id", (req, res) => {
  userTaskController.getByUserId(req, res);
});

router.delete("/:id", (req, res) => {
  userTaskController.delete(req, res);
});

export default { router };

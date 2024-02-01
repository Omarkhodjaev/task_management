import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import {
  UserTaskSchema,
  UserTaskUpdateSchema,
} from "./validation/user_task.validation.js";

export class UserTaskController {
  #userTaskService;
  #userService;
  #taskService;
  #repository;
  constructor(UserTaskService, UserTaskRepository, UserService, TaskService) {
    this.#repository = UserTaskRepository;
    this.#userTaskService = UserTaskService;
    this.#userService = UserService;
    this.#taskService = TaskService;
  }

  async create(req, res) {
    try {
      const dto = req.body;
      validationSchema(UserTaskSchema, dto);

      await this.#userService.getById(dto.userId);
      await this.#taskService.getById(dto.taskId);

      const resData = await this.#userTaskService.create(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      if (error) {
        const resData = new ResData(error.message, error.statusCode);
        res.status(resData.statusCode).json(resData);
      }
    }
  }

  async getById(req, res) {
    try {
      const userTaskId = req.params.id;
      const resData = await this.#userTaskService.getById(userTaskId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async getByUserId(req, res) {
    try {
      const userTaskId = req.params.id;
      const resData = await this.#userTaskService.getByUserId(userTaskId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async getByTaskId(req, res) {
    try {
      const userTaskId = req.params.id;
      const resData = await this.#userTaskService.getByTaskId(userTaskId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async update(req, res) {
    try {
      const dto = req.body;
      const userTaskId = req.params.id;
      const foundUserTask = await this.#repository.findOneById(userTaskId);

      if (!foundUserTask) {
        throw new UserTaskNotFound();
      }

      validationSchema(UserTaskUpdateSchema, dto);

      const checkedDto = Object.assign(foundUserTask, dto);

      const resData = await this.#userTaskService.update(
        checkedDto,
        userTaskId
      );

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      if (error) {
        const resData = new ResData(error.message, error.statusCode);
        res.status(resData.statusCode).json(resData);
      }
    }
  }

  async delete(req, res) {
    try {
      const userTaskId = req.params.id;
      const foundUserTask = await this.#repository.findOneById(userTaskId);

      if (!foundUserTask) {
        throw new UserTaskNotFound();
      }

      const resData = await this.#userTaskService.delete(userTaskId);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }
}

import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import {
  UserCompanyIdNotFound,
  UserNotFound,
} from "../user/exception/user.exception.js";
import { TaskNotFound } from "./exception/task.exception.js";
import { TaskSchema, TaskUpdateSchema } from "./validation/task.validation.js";

export class TaskController {
  #taskService;
  #repository;
  constructor(TaskService, TaskRepository) {
    this.#repository = TaskRepository;
    this.#taskService = TaskService;
  }

  async create(req, res) {
    try {
      const dto = req.body;

      validationSchema(TaskSchema, dto);

      const resData = await this.#taskService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      if (error) {
        const resData = new ResData(error.message, error.statusCode);
        res.status(resData.statusCode).json(resData);
      }
    }
  }

  async getAll(req, res) {
    try {
      let resData;
      if (req.currentUser.role === "superAdmin") {
        if (req.query.companyId) {
          resData = await this.#taskService.getAllByCompanyId(
            req.query.companyId
          );
        } else {
          resData = await this.#taskService.getAll();
        }
      } else {
        if (req.currentUser.company_id) {
          resData = await this.#taskService.getAllByCompanyId(
            req.currentUser.company_id
          );
        } else {
          throw new UserCompanyIdNotFound();
        }
      }

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

  async getById(req, res) {
    try {
      const userId = req.params.id;
      const resData = await this.#taskService.getById(userId);

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
      const taskId = req.params.id;

      const foundTask = await this.#repository.findOneById(taskId);

      if (!foundTask) {
        throw new TaskNotFound();
      }

      validationSchema(TaskUpdateSchema, dto);
      const checkedDto = Object.assign(foundTask, dto);
      
      const resData = await this.#taskService.update(checkedDto, taskId);

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
      const taskId = req.params.id;
      const foundTask = await this.#repository.findOneById(taskId);

      if (!foundTask) {
        throw new UserNotFound();
      }

      const resData = await this.#taskService.delete(taskId);
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

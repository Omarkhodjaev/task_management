import { ResData } from "../../common/resData.js";
import { TaskEntity } from "./entity/task.entity.js";
import { TaskNotFoundById } from "./exception/user.exception.js";
import { TaskRepository } from "./task.repository.js";

export class TaskService {
  #repository;
  constructor() {
    this.#repository = new TaskRepository();
  }

  async create(dto) {
    const taskEntity = new TaskEntity(dto);
    const task = await this.#repository.insert(taskEntity);

    const resData = new ResData("A new task is created", 200, {
      task,
    });

    return resData;
  }

  async update(dto, taskId) {
    const taskEntity = new TaskEntity(dto);

    const task = await this.#repository.update(taskEntity, taskId);

    const resData = new ResData("Task is updated", 200, task);
    return resData;
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("All company's tasks is gotten", 200, foundAll);

    return resData;
  }

  async getAllByCompanyId(companId) {
    const foundAll = await this.#repository.findAllCompanyById(companId);

    if (!foundAll.length) {
      throw new TaskNotFoundById();
    }

    const resData = new ResData("All tasks is gotten", 200, foundAll);

    return resData;
  }

  async getById(taskId) {
    const foundTask = await this.#repository.findOneById(taskId);

    if (!foundTask) {
      throw new TaskNotFound();
    }

    const resData = new ResData("Found a task by id", 200, foundTask);

    return resData;
  }

  async delete(taskId) {
    const deletedTask = await this.#repository.delete(taskId);

    const resData = new ResData("Deleted task by id", 200, deletedTask);

    return resData;
  }
}

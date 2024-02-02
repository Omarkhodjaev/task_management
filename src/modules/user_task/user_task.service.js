import { ResData } from "../../common/resData.js";
import { UserTaskEntity } from "./entity/user_task.entity.js";
import {
  UserNotFoundByTaskId,
  UserNotFoundByUserId,
  UserTaskNotFoundById,
} from "./exception/user_task.exception.js";
import { UserTaskRepository } from "./user_task.repository.js";

export class UserTaskService {
  #repository;
  constructor() {
    this.#repository = new UserTaskRepository();
  }

  async create(dto) {
    const userTaskEntity = new UserTaskEntity(dto);

    const userTask = await this.#repository.insert(userTaskEntity);

    const resData = new ResData("A new UserTask is created", 200, userTask);

    return resData;
  }

  async update(dto, userTaskId) {
    const userTaskEntity = new UserTaskEntity(dto);

    const userTask = await this.#repository.update(userTaskEntity, userTaskId);

    const resData = new ResData("UserTask is updated", 200, userTask);
    return resData;
  }

  async getById(userTaskId) {
    const foundUserTask = await this.#repository.findOneById(userTaskId);

    if (!foundUserTask) {
      throw new UserTaskNotFoundById();
    }

    const resData = new ResData(
      "Found a user_task by User_Task_Id",
      200,
      foundUserTask
    );

    return resData;
  }

  async getByUserId(userId) {
    const foundUserTask = await this.#repository.findOneByUserId(userId);

    if (!foundUserTask.length) {
      throw new UserNotFoundByUserId();
    }

    const resData = new ResData(
      "Found a user_task by userid",
      200,
      foundUserTask
    );

    return resData;
  }

  async getByTaskId(TaskId) {
    const foundUserTask = await this.#repository.findOneByTaskId(TaskId);

    if (!foundUserTask.length) {
      throw new UserNotFoundByTaskId();
    }

    const resData = new ResData(
      "Found a user_task by taskId",
      200,
      foundUserTask
    );

    return resData;
  }

  async delete(userTaskid) {
    const deletedUser = await this.#repository.delete(userTaskid);

    const resData = new ResData("Deleted user_task by id", 200, deletedUser);

    return resData;
  }
}

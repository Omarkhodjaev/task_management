import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import {
  UserAlreadyExist,
  UserLoginAlreadyExist,
  UserNotFound,
  UserNotFoundById,
} from "./exception/user.exception.js";
import { UserSchema, UserUpdateSchema } from "./validation/user.validation.js";

export class UserController {
  #userService;
  #repository;
  constructor(UserService, UserRepository) {
    this.#repository = UserRepository;
    this.#userService = UserService;
  }

  async create(req, res) {
    try {
      const dto = req.body;
      validationSchema(UserSchema, dto);

      const foundUser = await this.#repository.findByLogin(dto.login);

      if (foundUser) {
        throw new UserAlreadyExist();
      }
      const resData = await this.#userService.create(dto);

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
      const resData = await this.#userService.getAll();

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

  async getByLogin(req, res) {
    try {
      const login = req.body.login;
      const resData = await this.#userService.getByLogin(login);

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
      const userId = req.query.id;
      const foundUser = await this.#repository.findOneById(userId);

      if (!foundUser) {
        throw new UserNotFound();
      }

      const isEmptyLogin = await this.#repository.findByLogin(dto.login);

      if (isEmptyLogin) {
        throw new UserLoginAlreadyExist();
      }

      validationSchema(UserUpdateSchema, dto);

      const checkedDto = Object.assign(foundUser, dto);

      const resData = await this.#userService.update(checkedDto, userId);

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
      const userId = req.params.id;

      const foundUser = await this.#repository.findOneById(userId);

      if (!foundUser) {
        throw new UserNotFound();
      }

      const resData = await this.#userService.delete(userId);
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

import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import {
  AdminCannotAssignSuperAdmin,
  UserAlreadyExist,
  UserCompanyIdNotFound,
  UserCompanyNotFound,
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

      if (req.currentUser.role === "admin" && dto.role === "superAdmin") {
        throw new AdminCannotAssignSuperAdmin();
      }

      const foundUser = await this.#repository.findByLogin(dto.login);

      if (foundUser) {
        throw new UserAlreadyExist();
      }
      if (dto.companyId) {
        const foundCompany = await this.#repository.findCompanyById(
          dto.companyId
        );
        
        if (!foundCompany) {
          throw new UserCompanyNotFound();
        }
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
      let resData;

      if (req.currentUser.role === "superAdmin") {
        if (req.query.companyId) {
          resData = await this.#userService.getAllByCompanyId(
            req.query.companyId
          );
        } else {
          resData = await this.#userService.getAll();
        }
      } else {
        if (req.currentUser.company_id) {
          resData = await this.#userService.getAllByCompanyId(
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
      const resData = await this.#userService.getById(userId);

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
      const userId = req.params.id;

      if (req.currentUser.role === "admin" && dto.role === "superAdmin") {
        throw new AdminCannotAssignSuperAdmin();
      }

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

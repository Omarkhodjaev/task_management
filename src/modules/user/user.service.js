import { ResData } from "../../common/resData.js";
import { compare, hashed } from "../../lib/bcript.js";
import { generateToken } from "../../lib/jwt.js";
import { UserEntity } from "./entity/user.entity.js";
import {
  LoginOrPassWrongException,
  UserCompanyIdNotFound,
  UserNotFound,
} from "./exception/user.exception.js";
import { UserRepository } from "./user.repository.js";

export class UserService {
  #repository;
  constructor() {
    this.#repository = new UserRepository();
  }

  async create(dto) {
    const hashedPassword = await hashed(dto.password);
    const userEntity = new UserEntity(dto, hashedPassword);

    const user = await this.#repository.insert(userEntity);
    const token = generateToken(user.id);

    const resData = new ResData("A new user is created", 200, {
      user,
      token,
    });

    return resData;
  }

  async update(dto, userId) {
    const hashedPassword = await hashed(dto.password);

    const userEntity = new UserEntity(dto, hashedPassword);

    const user = await this.#repository.update(userEntity, userId);

    const resData = new ResData("User is updated", 200, user);
    return resData;
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("All company's users is gotten", 200, foundAll);

    return resData;
  }

  async getAllByCompanyId(companId) {
    const foundAll = await this.#repository.findAllCompanyById(companId);

    if (!foundAll.length) {
      throw new UserCompanyIdNotFound();
    }

    const resData = new ResData("All users is gotten", 200, foundAll);

    return resData;
  }

  async getById(userId) {
    // console.log(userId);
    const foundUser = await this.#repository.findOneById(userId);
    if (!foundUser) {
      throw new UserNotFound();
    }

    const resData = new ResData("Found a user by id", 200, foundUser);

    return resData;
  }

  async delete(userId) {
    const deletedUser = await this.#repository.delete(userId);

    const resData = new ResData("Deleted user by id", 200, deletedUser);

    return resData;
  }


  async login(dto) {
    const { data: foundUser } = await this.findByLogin(dto.login);

    if (!foundUser) {
      throw new UserNotFound();
    }

    const isValidPassword = await compare(dto.password, foundUser.password);

    if (!isValidPassword) {
      throw new LoginOrPassWrongException();
    }

    const newToken = generateToken(foundUser.id);

    const resData = new ResData("success login", 200, {
      user: foundUser,
      token: newToken,
    });

    return resData;
  }

  async findByLogin(login) {
    const foundByLogin = await this.#repository.findOneByLogin(login);

    let resData;

    if (foundByLogin) {
      resData = new ResData("success login", 200, foundByLogin);
    } else {
      resData = new ResData("user not found", 404, foundByLogin);
    }

    return resData;
  }


}

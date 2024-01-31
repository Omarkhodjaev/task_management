import { ResData } from "../../common/resData.js";
import { hashed } from "../../lib/bcript.js";
import { generateToken } from "../../lib/jwt.js";
import { UserEntity } from "./entity/user.entity.js";
import { UserNotFound } from "./exception/user.exception.js";
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

  async update(dto,userId) {
    const hashedPassword = await hashed(dto.password);

    const userEntity = new UserEntity(dto, hashedPassword);

    const user = await this.#repository.update(userEntity,userId);

    const resData = new ResData("User is updated", 200, user);
    return resData;
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("All users is gotten", 200, foundAll);

    return resData;
  }

  async getByLogin(login) {
    const foundUser = await this.#repository.findByLogin(login);

    if (!foundUser) {
      throw new UserNotFound();
    }

    const resData = new ResData("Found a user by id", 200, foundUser);

    return resData;
  }

  async delete(login) {
    const deletedUser = await this.#repository.delete(login);

    const resData = new ResData("Deleted user by login", 200, deletedUser);

    return resData;
  }
}
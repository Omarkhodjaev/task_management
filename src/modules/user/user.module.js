import { Router } from "express";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { UserRepository } from "./user.repository.js";

const router = Router();

const userService = new UserService();
const userRepository = new UserRepository();

const userController = new UserController(userService, userRepository);

router.post("/create", (req, res) => {
  userController.create(req, res);
});

router.get("/", (req, res) => {
  userController.getAll(req, res);
});

router.put("/", (req, res) => {
  userController.update(req, res);
});

router.get("/:id", (req, res) => {
  userController.getByLogin(req, res);
});

router.delete("/:id", (req, res) => {
  userController.delete(req, res);
});

export default { router };

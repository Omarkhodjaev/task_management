import { Router } from "express";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";
import { UserRepository } from "./user.repository.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const userService = new UserService();
const userRepository = new UserRepository();
const userController = new UserController(userService, userRepository);

const authorizationMiddleware = new AuthorizationMiddleware();

router.post(
  "/create",
  // authorizationMiddleware.checkToken,
  // authorizationMiddleware.checkUser,
  // authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.create(req, res);
  }
);

router.get(
  "/",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  (req, res) => {
    userController.getAll(req, res);
  }
);

router.put(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
  
    userController.update(req, res);
  }
);

router.get("/:id", (req, res) => {
  userController.getById(req, res);
});

router.delete(
  "/:id",
  authorizationMiddleware.checkToken,
  authorizationMiddleware.checkUser,
  authorizationMiddleware.checkAdminRole,
  (req, res) => {
    userController.delete(req, res);
  }
);

export default { router };

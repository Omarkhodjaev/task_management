import { Router } from "express";
import { CompanyController } from "./company.controller.js";
import { CompanyService } from "./company.service.js";
import { CompanyRepository } from "./company.repository.js";
import { AuthorizationMiddleware } from "../../middleware/authorization.js";

const router = Router();

const companyService = new CompanyService();
const companyRepository = new CompanyRepository();

const authorizationMiddleware = new AuthorizationMiddleware();

const companyController = new CompanyController(
  companyService,
  companyRepository
);

router.post("/create", (req, res) => {
  companyController.create(req, res);
});

router.get("/", authorizationMiddleware.checkToken,authorizationMiddleware.checkUser, authorizationMiddleware.checkSuperAdminRole, (req, res) => {
  companyController.getAll(req, res);
});

router.get("/:id", authorizationMiddleware.checkToken, authorizationMiddleware.checkUser, (req, res) => {
  companyController.getMyCompanybyId(req, res);
});


router.delete("/:id", (req, res) => {
  companyController.delete(req, res);
});

export default { router };

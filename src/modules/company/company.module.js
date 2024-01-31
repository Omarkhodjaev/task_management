import { Router } from "express";
import { CompanyController } from "./company.controller.js";
import { CompanyService } from "./company.service.js";
import { CompanyRepository } from "./company.repository.js";

const router = Router();

const companyService = new CompanyService();
const companyRepository = new CompanyRepository();

const companyController = new CompanyController(
  companyService,
  companyRepository
);

router.post("/create", (req, res) => {
  companyController.create(req, res);
});

router.get("/", (req, res) => {
  companyController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  companyController.getById(req, res);
});

router.delete("/:id", (req, res) => {
  companyController.delete(req, res);
});

export default { router };

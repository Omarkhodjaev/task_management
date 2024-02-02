import { BadRequestException } from "../../common/exception/exception.js";
import { ResData } from "../../common/resData.js";
import { validationSchema } from "../../lib/validationSchema.js";
import {
  CompanyAlreadyExist,
  CompanyIdMustBeRequired,
  CompanyNotFound,
} from "./exception/company.exception.js";
import { CompanySchema } from "./validation/company.validation.js";

export class CompanyController {
  #companyService;
  #repository;
  constructor(CompanyService, CompanyRepository) {
    this.#companyService = CompanyService;
    this.#repository = CompanyRepository;
  }

  async create(req, res) {
    try {
      const dto = req.body;

      validationSchema(CompanySchema, dto);

      const foundCompany = await this.#repository.findByName(dto.name);

      if (foundCompany) {
        throw new CompanyAlreadyExist();
      }

      const resData = await this.#companyService.create(dto);

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
      const resData = await this.#companyService.getAll();

      if (
        !req.currentUser.role === "superAdmin" &&
        req.params.id === undefined
      ) {
        throw new CompanyIdMustBeRequired();
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

  async getMyCompanybyId(req, res) {
    try {
      const companyId =
        req.currentUser.role === "superAdmin"
          ? req.params.id
          : req.currentUser.company_id;

      const resData = await this.#companyService.getMyCompany(companyId);

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
      const companyId = req.params.id;
      const dto = req.body;
      const foundCompany = await this.#repository.findOneById(companyId);

      if (!foundCompany) {
        throw new CompanyNotFound();
      }

      validationSchema(CompanySchema, dto);

      const resData = await this.#companyService.update(dto, companyId);

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

  async delete(req, res) {
    try {
      const companyId = req.params.id;

      const foundCompany = await this.#repository.findOneById(companyId);

      if (!foundCompany) {
        throw new CompanyNotFound();
      }

      const resData = await this.#companyService.delete(companyId);
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

import { BadRequestException } from "../../common/exception/exception.js";
import { ResData } from "../../common/resData.js";
import {
  CompanyAlreadyExist,
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

      const { value, error } = CompanySchema.validate(dto);

      if (error) {
        throw new BadRequestException(error.message);
      }

      const foundCompany = await this.#repository.findByName(dto.name);

      
      console.log(1);

      if (foundCompany) {
        console.log(foundCompany);
        throw new CompanyAlreadyExist();
      }

      const resData = await this.#companyService.create(value);

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
      const companyId = req.params.id;
      const resData = await this.#companyService.getById(companyId);

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

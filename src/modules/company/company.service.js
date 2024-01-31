import { ResData } from "../../common/resData.js";
import { CompanyEntity } from "./entity/brand.entity.js";
import { CompanyNotFoundById } from "./exception/company.exception.js";
import { CompanyRepository } from "./company.repository.js";

export class CompanyService {
  #repository;
  constructor() {
    this.#repository = new CompanyRepository();
  }
  async create(dto) {
    const companyEntity = new CompanyEntity(dto);

    const company = await this.#repository.insert(companyEntity);

    const resData = new ResData("A new company is created", 200, company);
    return resData;
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("All companies is gotten", 200, foundAll);

    return resData;
  }

  async getById(companyId) {
    const foundCompany = await this.#repository.findOneById(companyId);

    if (!foundCompany) {
      throw new CompanyNotFoundById();
    }

    const resData = new ResData("Found a company", 200, foundCompany);

    return resData;
  }

  async delete(companyId) {
    const deletedCompany = await this.#repository.delete(companyId);

    const resData = new ResData("Deleted company by id", 200, deletedCompany);

    return resData;
  }
}

import { ResData } from "../../common/resData.js";
import { CompanyEntity } from "./entity/brand.entity.js";
import { CompanyRepository } from "./company.repository.js";
import { CompanyNotFound } from "./exception/company.exception.js";

export class CompanyService {
  #repository;
  constructor() {
    this.#repository = new CompanyRepository();
  }
  async create(dto) {
    const companyEnt = new CompanyEntity(dto);

    const company = await this.#repository.insert(companyEnt);

    const resData = new ResData("A new company is created", 200, company);
    return resData;
  }

  async getAll() {
    const foundAll = await this.#repository.findAll();

    const resData = new ResData("All companies is gotten", 200, foundAll);

    return resData;
  }

  async update(dto, companyId) {
    const companyEntity = new CompanyEntity(dto);

    const company = await this.#repository.update(companyEntity, companyId);

    const resData = new ResData("Company is updated", 200, company);
    return resData;
  }

  async getMyCompany(companyId) {
    const foundCompany = await this.#repository.findOneById(companyId);

    if (!foundCompany) {
      throw new CompanyNotFound();
    }

    const resData = new ResData("Found my company", 200, foundCompany);
    return resData;
  }

  async delete(companyId) {
    const deletedCompany = await this.#repository.delete(companyId);

    const resData = new ResData("Deleted company by id", 200, deletedCompany);

    return resData;
  }
}

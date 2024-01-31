import { Postgres } from "../../lib/pg.js";

export class CompanyRepository extends Postgres {
  async insert(companyEntity) {
    return await this.fetch(
      `INSERT INTO companies (name) VALUES($1) returning * `,
      companyEntity.name
    );
  }

  async findAll() {
    return await this.fetchAll("SELECT * from companies");
  }

  async findOneById(companyId) {
    return await this.fetch("SELECT * from companies where id = $1", companyId);
  }

  async findByName(companyName) {
    return await this.fetch(
      "SELECT * from companies where name = $1",
      companyName
    );
  }

  async update(companyEntity) {
    return await this.fetch(
      "UPDATE companies SET name = $1 returning *",
      companyEntity.name
    );
  }

  async delete(companyId) {
    return await this.fetch(
      "DELETE FROM companies WHERE id = $1 returning *",
      companyId
    );
  }
}

import { Postgres } from "../../lib/pg.js";

export class UserRepository extends Postgres {
  async insert(userEntity) {
    return await this.fetch(
      `INSERT INTO users (login,password,full_name,company_id,role) VALUES($1,$2,$3,$4,$5) returning * `,
      userEntity.login,
      userEntity.password,
      userEntity.full_name,
      userEntity.company_id,
      userEntity.role
    );
  }

  async findOneByLogin(login) {
    return await this.fetch("select * from users where login = $1", login);
  }

  async findAll() {
    return await this.fetchAll("SELECT * from users");
  }

  //for register user's company find
  async findCompanyById(companyId) {
    return await this.fetch("SELECT * from companies where id = $1", companyId);
  }

  async findAllCompanyById(companyId) {
    return await this.fetchAll(
      "SELECT * from users where company_id = $1",
      companyId
    );
  }

  async findOneById(userId) {
    return await this.fetch("SELECT * from users where id = $1", userId);
  }

  async findByLogin(userlogin) {
    return await this.fetch("SELECT * from users where login = $1", userlogin);
  }

  async update(userEntity, userId) {
    return await this.fetch(
      "UPDATE users SET login = $1, password = $2, full_name = $3, company_id = $4, role = $5 where id = $6 returning *",
      userEntity.login,
      userEntity.password,
      userEntity.full_name,
      userEntity.company_id,
      userEntity.role,
      userId
    );
  }

  async delete(userId) {
    return await this.fetch(
      "DELETE FROM users WHERE id = $1 returning *",
      userId
    );
  }
}

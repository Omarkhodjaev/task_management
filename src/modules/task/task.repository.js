import { Postgres } from "../../lib/pg.js";

export class TaskRepository extends Postgres {
  async insert(taskEntity) {
    return await this.fetch(
      `INSERT INTO tasks (title,description,company_id,parent_id,day) VALUES($1,$2,$3,$4,$5) returning * `,
      taskEntity.title,
      taskEntity.description,
      taskEntity.company_id,
      taskEntity.parent_id,
      taskEntity.day
    );
  }

  async findAll() {
    return await this.fetchAll("SELECT * from tasks");
  }
  async findAllCompanyById(companyId) {
    return await this.fetchAll(
      "SELECT * from tasks where company_id = $1",
      companyId
    );
  }

  async findOneById(taskId) {
    return await this.fetch("SELECT * from tasks where id = $1", taskId);
  }

  async update(taskEntity, taskId) {
    return await this.fetch(
      "UPDATE tasks SET title = $1, description = $2, company_id = $3, parent_id = $4, day = $5 where id = $6 returning *",
      taskEntity.title,
      taskEntity.description,
      taskEntity.company_id,
      taskEntity.parent_id,
      taskEntity.day,
      taskId
    );
  }

  async delete(taskId) {
    return await this.fetch(
      "DELETE FROM tasks WHERE id = $1 returning *",
      taskId
    );
  }
}

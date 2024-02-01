import { Postgres } from "../../lib/pg.js";

export class UserTaskRepository extends Postgres {
  async insert(UserTaskEntity) {
    return await this.fetch(
      `INSERT INTO user_tasks (user_id, task_id, start_at, end_at, started_date, ended_date, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`,
      UserTaskEntity.user_id,
      UserTaskEntity.task_id,
      UserTaskEntity.start_at,
      UserTaskEntity.end_at,
      UserTaskEntity.started_date,
      UserTaskEntity.ended_date,
      UserTaskEntity.status
    );
  }

  async findAll() {
    return await this.fetchAll("SELECT * from user_tasks");
  }

  async findAllCompanyById(companyId) {
    return await this.fetchAll(
      "SELECT * from user_tasks where company_id = $1",
      companyId
    );
  }

  async findOneById(UserTaskId) {
    return await this.fetch(
      "SELECT * from user_tasks where id = $1",
      UserTaskId
    );
  }

  async findOneByUserId(UserId) {
    return await this.fetch(
      "SELECT * from user_tasks where user_id = $1",
      UserId
    );
  }

  async findOneByTaskId(TaskId) {
    return await this.fetch(
      "SELECT * from user_tasks where task_id = $1",
      TaskId
    );
  }

  async update(UserTaskEntity, userTaskId) {
    return await this.fetch(
      "UPDATE user_tasks SET user_id = $1, task_id = $2, start_at = $3, end_at = $4, started_date = $5, ended_date = $6, status = $7 where id = $8 returning *",
      UserTaskEntity.user_id,
      UserTaskEntity.task_id,
      UserTaskEntity.start_at,
      UserTaskEntity.end_at,
      UserTaskEntity.started_date,
      UserTaskEntity.ended_date,
      UserTaskEntity.status,
      userTaskId
    );
  }



  async delete(taskId) {
    return await this.fetch(
      "DELETE FROM user_tasks WHERE id = $1 returning *",
      taskId
    );
  }
}

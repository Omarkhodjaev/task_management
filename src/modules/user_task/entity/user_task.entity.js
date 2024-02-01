export class UserTaskEntity {
  constructor(dto) {
    (this.user_id = dto.userId || dto.user_id),
      (this.task_id = dto.taskId || dto.task_id),
      (this.start_at = dto.startAt || dto.start_at),
      (this.end_at = dto.endAt || dto.end_at),
      (this.started_date = dto.startedDate || dto.started_date),
      (this.ended_date = dto.endedDate || dto.ended_date),
      (this.status = dto.status);
  }
}


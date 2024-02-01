export class TaskEntity {
  constructor(dto) {
    (this.title = dto.title),
      (this.description = dto.description),
      (this.company_id = dto.companyId || dto.company_id),
      (this.parent_id = dto.parentId || dto.parent_id),
      (this.day = dto.day);
  }
}

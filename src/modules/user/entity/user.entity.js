export class UserEntity {
  constructor(dto, hashedpassword) {
    (this.login = dto.login),
      (this.password = hashedpassword),
      (this.full_name = dto.fullName || dto.full_name),
      (this.company_id = dto.companyId || null || dto.company_id),
      (this.role = dto.role);
  }
}

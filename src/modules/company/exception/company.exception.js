export class CompanyAlreadyExist extends Error {
  constructor() {
    super("Company already exist");
    this.statusCode = 403;
  }
}

export class CompanyNotFoundById extends Error {
  constructor() {
    super("Company not found by id");
    this.statusCode = 404;
  }
}

export class CompanyNotFound extends Error {
  constructor() {
    super("Company not found");
    this.statusCode = 404;
  }
}

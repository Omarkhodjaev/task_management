export class UserAlreadyExist extends Error {
  constructor() {
    super("User already exist");
    this.statusCode = 403;
  }
}

export class UserLoginAlreadyExist extends Error {
  constructor() {
    super("User login already exist");
    this.statusCode = 403;
  }
}



export class UserNotFoundById extends Error {
  constructor() {
    super("User not found by id");
    this.statusCode = 404;
  }
}

export class UserNotFound extends Error {
  constructor() {
    super("User not found");
    this.statusCode = 404;
  }
}

export class UserCompanyIdNotFound extends Error {
  constructor() {
    super("User has not company");
    this.statusCode = 404;
  }
}

export class AdminCannotAssignSuperAdmin extends Error {
  constructor() {
    super("Admin cannot assign super admin");

    this.statusCode = 400;
  }
}

export class UserCompanyNotFound extends Error {
  constructor() {
    super("User's company not found");

    this.statusCode = 404;
  }
}

export class LoginOrPassWrongException extends Error {
  constructor() {
    super("Login or password wrong please try again!");

    this.statusCode = 500;
  }
}

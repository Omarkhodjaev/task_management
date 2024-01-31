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

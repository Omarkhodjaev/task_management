export class UserTaskNotFoundById extends Error {
  constructor() {
    super("User_Task not found by id");
    this.statusCode = 404;
  }
}

export class UserNotFoundByUserId extends Error {
  constructor() {
    super("User_Task not found by userId");
    this.statusCode = 404;
  }
}

export class UserNotFoundByTaskId extends Error {
    constructor() {
      super("User_Task not found by userId");
      this.statusCode = 404;
    }
  }



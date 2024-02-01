export class TaskNotFoundById extends Error {
  constructor() {
    super("Task not found by id");
    this.statusCode = 404;
  }
}

export class TaskNotFound extends Error {
  constructor() {
    super("Task not found");
    this.statusCode = 404;
  }
}

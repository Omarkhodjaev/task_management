import { Router } from "express";
import company from "./company/company.module.js";
import user from "./user/user.module.js";
import task from "./task/task.module.js";
import userTask from "./user_task/user_task.module.js";

const router = Router();

router.use("/company", company.router);
router.use("/user", user.router);
router.use("/task", task.router);
router.use("/user-task", userTask.router);


export default { router };

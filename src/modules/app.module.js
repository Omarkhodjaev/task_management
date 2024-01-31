import { Router } from "express";
import company from "./company/company.module.js";
import user from "./user/user.module.js";

const router = Router();

router.use("/company", company.router);
router.use("/user", user.router);

export default { router };

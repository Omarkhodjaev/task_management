import { Router } from "express";
import company from "./company/company.module.js";

const router = Router();

router.use("/company", company.router);

export default { router };

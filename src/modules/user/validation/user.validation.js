import Joi from "joi";
import { roles } from "../../../common/enums/roles.js";

export const UserSchema = Joi.object({
  login: Joi.string().min(1).max(50).required(),
  password: Joi.string().min(6).max(100).required(),
  fullName: Joi.string().min(2).max(100).required(),
  companyId: Joi.number().min(1),
  role: Joi.string()
    .valid(roles.ADMIN, roles.MANAGER, roles.SUPER_ADMIN, roles.WORKER)
    .min(2)
    .max(20)
    .required(),
});

export const UserUpdateSchema = Joi.object({
  login: Joi.string().min(1).max(50),
  password: Joi.string().min(1).max(100),
  fullName: Joi.string().min(2).max(100),
  companyId: Joi.number().min(1),
  role: Joi.string()
    .valid(roles.ADMIN, roles.MANAGER, roles.SUPER_ADMIN, roles.WORKER)
    .min(2)
    .max(20),
});

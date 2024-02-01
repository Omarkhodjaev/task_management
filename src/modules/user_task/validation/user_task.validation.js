import Joi from "joi";

import { status } from "../../../common/enums/status.js";

export const UserTaskSchema = Joi.object({
  userId: Joi.number().required(),
  taskId: Joi.number().required(),
  startAt: Joi.string().max(64).required(),
  endAt: Joi.string().max(64).required(),
  startedDate: Joi.string().max(64),
  endedDate: Joi.string().max(64),
  status: Joi.string()
    .valid(status.DONE, status.PROCCESS, status.TOOK)
    .max(20)
    .required(),
});

export const UserTaskUpdateSchema = Joi.object({
  userId: Joi.number(),
  taskId: Joi.number(),
  startAt: Joi.string().max(64),
  endAt: Joi.string().max(64),
  startedDate: Joi.string().max(64),
  endedDate: Joi.string().max(64),
  status: Joi.string()
    .valid(status.DONE, status.PROCCESS, status.TOOK)
    .max(20)
    .required(),
});

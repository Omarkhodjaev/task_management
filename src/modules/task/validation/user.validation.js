import Joi from "joi";

export const TaskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().required(),
  companyId: Joi.number().min(1).required(),
  parentId: Joi.number(),
  day: Joi.number().min(1).required(),
});

export const TaskUpdateSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  description: Joi.string(),
  companyId: Joi.number().min(1),
  parentId: Joi.number(),
  day: Joi.number().min(1),
});

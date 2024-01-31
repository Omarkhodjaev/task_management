import Joi from "joi";

export const CompanySchema = Joi.object({
  name: Joi.string().min(1).max(64).required(),
});

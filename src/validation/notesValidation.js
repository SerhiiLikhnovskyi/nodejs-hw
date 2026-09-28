import { Joi } from 'celebrate';

const bodySchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  c,
});

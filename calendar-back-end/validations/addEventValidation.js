const Joi = require("@hapi/joi")

const addEventValidation = (data) => {
  const schema = Joi.object({
    start: Joi.date().required(),
    end: Joi.date().required(),
    title: Joi.string().min(1).max(1024).required(),
    description: Joi.string(),
    public: Joi.boolean(),
    busy: Joi.boolean()
  });
  return schema.validate(data)
}
module.exports = {
  addEventValidation,
}
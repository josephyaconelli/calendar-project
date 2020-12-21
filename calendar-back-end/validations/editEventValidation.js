const Joi = require("@hapi/joi")

const editEventValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    toUpdate: Joi.object({
      start: Joi.date(),
      end: Joi.date(),
      title: Joi.string().min(1).max(1024),
      description: Joi.string(),
      public: Joi.boolean(),
      busy: Joi.boolean()
    }).required()
  })
  return schema.validate(data)
};
module.exports = {
  editEventValidation,
}
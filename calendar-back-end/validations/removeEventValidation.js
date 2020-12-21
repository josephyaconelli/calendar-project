const Joi = require("@hapi/joi")

const removeEventValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  })
  return schema.validate(data)
};
module.exports = {
  removeEventValidation,
}
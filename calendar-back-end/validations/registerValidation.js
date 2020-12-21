const Joi = require("@hapi/joi")

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  })
  return schema.validate(data)
}
module.exports = {
  registerValidation,
}
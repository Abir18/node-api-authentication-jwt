const Joi = require("joi");

// Registration Validation
const registrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(8).required(),
    email: Joi.string().min(3).max(18).required().email(),
    password: Joi.string().min(6).max(255).required()
  });

  return schema.validate(data);
};

// LOGIN Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(18).required().email(),
    password: Joi.string().min(6).max(10).required()
  });
  return schema.validate(data);
};

module.exports = {registrationValidation, loginValidation};

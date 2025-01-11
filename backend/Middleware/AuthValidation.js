const Joi = require("joi");

const SignUpValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(12)
      .max(20)
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must include at least one uppercase letter, one number, and one special character.",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(12)
      .max(20)
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must include at least one uppercase letter, one number, and one special character.",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

module.exports = {
  loginValidation,
  SignUpValidation,
};

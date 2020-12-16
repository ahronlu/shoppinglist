const { body, validationResult } = require("express-validator");

const loginValidationRules = () => {
  return [
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please include a password with at least 6 chars"
    ).isLength({
      min: 6,
    }),
  ];
};

const registerValidationRules = () => {
  return [
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please include a password with at least 6 chars"
    ).isLength({
      min: 6,
    }),
    body("name", "Please include a name with at least 2 chars").isLength({
      min: 2,
    }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { loginValidationRules, registerValidationRules, validate };

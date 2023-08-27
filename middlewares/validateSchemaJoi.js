const { HttpError } = require("../helpers");

const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, `missing required ${error.details[0].path} field`));
    }
    next();
  };
};

module.exports = {
  validateSchema,
};

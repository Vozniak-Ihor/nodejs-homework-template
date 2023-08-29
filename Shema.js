const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `name should be a type of 'text'`,
    "string.empty": `name cannot be an empty field`,
    "any.required": `name is a required field`,
  }),
  email: Joi.string().email().required().messages({
    "string.base": `email should be a type of 'text'`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `email is a required field`,
  }),
  phone: Joi.string().required().messages({
    "string.base": `phone should be a type of 'text'`,
    "string.empty": `phone cannot be an empty field`,
    "any.required": `phone is a required field`,
  }),
});

const addShemaFavorite = Joi.object({
  favorite: Joi.boolean().required().messages({
    "string.base": `favorite should be a type of 'text'`,
    "string.empty": `favorite cannot be an empty field`,
    "any.required": `favorite is a required field`,
  }),
});

module.exports = {
  addShema,
  addShemaFavorite,
};

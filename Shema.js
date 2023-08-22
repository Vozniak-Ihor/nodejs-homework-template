const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const addShemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});
 

module.exports = {
  addShema,addShemaFavorite
};

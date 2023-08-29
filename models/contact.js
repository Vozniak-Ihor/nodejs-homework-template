const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
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
  Contact,
  addSchema,
  addShemaFavorite,
};

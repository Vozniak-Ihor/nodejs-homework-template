const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timeseries: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required().messages({
    "string.base": `email should be a type of 'text'`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `email is a required field`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": `password should be a type of 'text'`,
    "string.empty": `password cannot be an empty field`,
    "any.required": `password is a required field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": `email should be a type of 'text'`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `email is a required field`,
  }),
  password: Joi.string().min(5).required().messages({
    "string.base": `password should be a type of 'text'`,
    "string.empty": `password cannot be an empty field`,
    "any.required": `password is a required field`,
  }),
});

const addShemaSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required().messages({
    "string.base": `subscription should be a type of 'text'`,
    "string.empty": `subscription cannot be an empty field`,
    "any.required": `subscription is a required field`,
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  addShemaSubscription,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};

const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const userEmail = await User.findOne({ email });
  const userPassword = await User.findOne({ password });
  if (userEmail) {
    throw HttpError(409, "Email in use");
  }
  if (userPassword) {
    throw HttpError(409, "Password in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const resart = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: { email: resart.email, subscription: resart.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  const resart = await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email: resart.email, subscription: resart.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({});
};

const updateStatusUser = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateStatusUser: ctrlWrapper(updateStatusUser),
};

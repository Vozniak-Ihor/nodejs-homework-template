const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config()

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://igor:oj2sGOnjqjxvzdZb@cluster0.q4njwwu.mongodb.net/Contacts_reader?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => console.log("Connected to Mongo"))
  .catch((error) => console.log(error.message));

module.exports = app;

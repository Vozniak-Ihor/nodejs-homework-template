const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const allContacts = async (req, res) => {
  const allContact = await Contact.find();
  res.status(200).json(allContact);
};

const contactById = async (req, res) => {
  const { contactId } = req.params;
  const getContact = await Contact.findOne({ _id: contactId });
  if (!getContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(getContact);
};

const addContact = async (req, res) => {
  const addContact = await Contact.create(req.body);
  res.status(201).json(addContact);
};

const removeContact = async (req, res) => {
  const deleteContacts = await Contact.findByIdAndRemove({
    _id: req.params.contactId,
  });
  if (!deleteContacts) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const update = await Contact.findByIdAndUpdate(
    { _id: req.params.contactId },
    req.body,
    { new: true }
  );
  if (!update) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(update);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate({_id: contactId}, req.body, {
    new: true
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  allContacts: ctrlWrapper(allContacts),
  contactById: ctrlWrapper(contactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};

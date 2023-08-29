const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const allContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite === "true") {
    const allContactFavorite = await Contact.find(
      { owner },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "name email");
    const reselt = allContactFavorite.filter((contact) => contact.favorite);
    res.status(200).json(reselt);
  } else {
    const allContact = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "name email");
    res.status(200).json(allContact);
  }
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
  const { _id: owner } = req.user;
  const addContact = await Contact.create({ ...req.body, owner});
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
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
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

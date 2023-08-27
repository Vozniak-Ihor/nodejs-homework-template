const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { isValidId, authenticate } = require("../../middlewares");
const { addShema, addShemaFavorite } = require("../../models/contact");
const { validateSchema } = require("../../middlewares/validateSchemaJoi");

router.get("/", authenticate, ctrl.allContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.contactById);

router.post("/", authenticate, validateSchema(addShema), ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  validateSchema(addShema),
  isValidId,
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateSchema(addShemaFavorite),
  ctrl.updateStatusContact
);

module.exports = router;

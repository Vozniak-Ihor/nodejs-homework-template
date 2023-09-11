const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { isValidId, authenticate } = require("../../middlewares");
const { addSchema, addShemaFavorite } = require("../../models/contact");
const { validateSchema,validateSchemaFavorite } = require("../../middlewares/validateSchemaJoi");

router.get("/", authenticate, ctrl.allContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.contactById);

router.post("/", authenticate, validateSchema(addSchema), ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  validateSchema(addSchema),
  isValidId,
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateSchemaFavorite(addShemaFavorite),
  ctrl.updateStatusContact
);

module.exports = router;

const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const isValidId = require("../../middlewares");
const { addShema , addShemaFavorite} = require("../../Shema");
const { validateSchema,validateSchemaFavorite } = require("../../middlewares/validateSchemaJoi");

router.get("/", ctrl.allContacts);

router.get("/:contactId", isValidId, ctrl.contactById);

router.post("/", validateSchema(addShema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put("/:contactId", validateSchema(addShema), isValidId, ctrl.updateContact);

router.patch("/:contactId/favorite",isValidId, validateSchemaFavorite(addShemaFavorite),  ctrl.updateStatusContact);

module.exports = router;

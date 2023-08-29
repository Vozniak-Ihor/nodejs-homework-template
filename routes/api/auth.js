const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/user");
const { validateSchema } = require("../../middlewares/validateSchemaJoi");
const { authenticate, upload } = require("../../middlewares/");
const { schemas } = require("../../models/user");

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/register", validateSchema(schemas.registerSchema), ctrl.register);

router.post("/login", validateSchema(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avarats", authenticate, upload.single("avatar"), ctrl.getAvatar);

router.patch(
  "/subscription",
  authenticate,
  validateSchema(schemas.addShemaSubscription),
  ctrl.updateStatusUser
);

module.exports = router;

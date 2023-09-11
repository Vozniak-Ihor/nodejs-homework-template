const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/user");
const {
  validateSchema,
  validateSchemaVerify,
} = require("../../middlewares/validateSchemaJoi");
const { authenticate, upload } = require("../../middlewares/");
const { schemas } = require("../../models/user");

router.post("/register", validateSchema(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify",  validateSchemaVerify(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateSchema(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.getAvatar);

router.patch(
  "/subscription",
  authenticate,
  validateSchema(schemas.addShemaSubscription),
  ctrl.updateStatusUser
);

module.exports = router;

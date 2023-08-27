const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/user");
const { validateSchema } = require("../../middlewares/validateSchemaJoi");
const { authenticate } = require("../../middlewares/");
const { schemas } = require("../../models/user");

router.post("/register", validateSchema(schemas.registerSchema), ctrl.register);

router.post("/login", validateSchema(schemas.loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout)

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
    "/subscription",
    authenticate,
    validateSchema(schemas.addShemaSubscription),
    ctrl.updateStatusUser
  );

module.exports = router;

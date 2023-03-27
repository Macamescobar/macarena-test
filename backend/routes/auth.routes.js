/* 
  Rutas de usuarios / Authentication
  host + /api/auth 
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { createUser, loginUser, renewToken } = require("../controllers/auth.controller");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

// ruta para registrar usuario, la cual valida los campos
router.post(
  "/register",
  [
    // middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser,
);

router.get("/renew",validateJWT, renewToken);

module.exports = router;

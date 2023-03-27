const { Router } = require("express");
const {
  associateToUserById,
} = require("../controllers/permissions.controller");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

// Ruta para asignar un permiso a un usuario por su id, el id se pasara por un params. /api/permissions/add/el-id-del-usuario-uuid
// además verificamos que el valor en el body permission no venga vacio
router.post("/add/:userId",
  [
    check("permission", "El permiso es obligatorio").not().isEmpty(),
    validateFields,
  ],
  validateJWT, // Se usa el validador del token, para ver que el usuario haya hecho login antes
  associateToUserById
);

module.exports = router;

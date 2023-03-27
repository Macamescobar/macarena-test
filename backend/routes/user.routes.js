const { Router } = require("express");
const { listAll, updateUser, deleteUser} = require("../controllers/user.controller");
const { validateJWT } = require("../middlewares/validate-jwt")

const router = Router();

router.get("/",validateJWT, listAll);

// ruta para editar usuario /api/users/users-id el userId irá en el params
// en el body irá el nombre y email
router.put("/:userId",validateJWT, updateUser);

// ruta para eliminar un usuario por id, ejemplo /api/users/user-id-uuid
router.delete("/:userId",validateJWT, deleteUser);

module.exports = router;
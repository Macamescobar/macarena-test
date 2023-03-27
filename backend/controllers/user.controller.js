const Access = require("../models/Access");
const Permission = require("../models/Permission");
const User = require("../models/User");

// obtener a todos los usuarios de la bases de datos
const listAll = async (req, res) => {
  // buscamos todos los usuarios de mongo
  let listOfUsers = await User.find();
  // cada usuario tendra permisos y accesos, por ende debemos asignarlos a cada uusuario
  // este es un for que debe esperar que todos los usuarios obtengan sus permisos y accessos por eso el await
  for await (let user of listOfUsers) {
    await fillAccessesAndPermissionsToUser(user);
  }
  res.status(200).json({ results: listOfUsers });
};

// actutalizar usuario (PUT)
const updateUser = async (req, res) => {
  // buscamos el id que pasamos por params /api/users/id-del-usuario
  const userId = req.params.userId;
  // obtenemos el name y email del body
  const { name, email } = req.body;
  // usamos la funcion de moongose quenos permite actualizar al usuario con los campos del nombre e email
  await User.findByIdAndUpdate(userId, { name, email });
  res.status(200).json({ msg: "success" });
};

//borramos a un usuario por su id
const deleteUser = async (req, res) => {
  // el req.params.id es el id del usuario que viene en el path
  // /api/users/id-del-usuario y se usa un DELETE
  await User.findOneAndDelete(req.params.id);
  res.status(200).json({ msg: "success" });
};

const fillAccessesAndPermissionsToUser = async (user) => {
  // buscamos todos los accesos de ese usuario (por eso se usa su id)
  // y ademas usamos el sort en el atributo createdAt en -1 para que ordene los accessos de forma descediiente
  user.accesses = await Access.find({ user: user._id }).sort({createdAt: -1});
  // buscamos y seteamos todos los permisos de ese usuario
  user.permissions = await Permission.find({ user: user._id });
};

module.exports = {
  listAll,
  updateUser,
  deleteUser,
};

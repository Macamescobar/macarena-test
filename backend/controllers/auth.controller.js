const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Access = require("../models/Access");
const Permission = require("../models/Permission");
const { generateJWT } = require("../helpers/jwt");

//metodo para crear un usuario
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    // verificamos que el usuario no exista en la base de datos, si existe lanzamos error
    if (!userFound) {
      const userStored = new User(req.body);

      // Encriptar contraseña
      const salt = bcrypt.genSaltSync(); //valor por defecto 10 vueltas
      userStored.password = bcrypt.hashSync(password, salt);

      userStored.save();

      // por default el usuario tendra un permiso que sera el VISUALIZACION_DASHBOARDS
      savePermissionDefault(userStored);

      res.status(201).json({
        ok: true,
        uuid: userStored.id,
        name: userStored.name,
        email: userStored.email,
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please speak with the administrator",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound) {
      //Confirm password, recibe el password que escribe el usuario vs el password almacenado en la BD
      const validPassword = bcrypt.compareSync(password, userFound.password); // return true or false
      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: "Invalid password",
        });
      }

       // guardamos el acceso cada vez que el usuario haga login
      saveAccess(userFound, res);
      // tambien buscamos todos los permisos que el usuario tenga asignados y se los seteamos al response
      // el Permission.find() busca todos los permisos, pero le agregamos la condicion que me traiga todos los permisos del usuario que hizo login
      const permissions = await Permission.find({ user: userFound._id });
      const token = generateJWT(userFound.id, userFound.name);

      res.json({
        ok: true,
        uuid: userFound.id,
        name: userFound.name,
        email: userFound.email,
        permissions: permissions,
        token,
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: "The user doesn't exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please speak with the administrator",
    });
  }
};

const renewToken = async (req, res) => {
  const { uuid, name } = req;
  const token = await generateJWT(uuid, name);
  res.json({
    ok: true,
    token,
    uuid,
    name,
  });
};

const saveAccess = async (user, res) => {
  try {
    const access = new Access();
    access.user = user;
    await access.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please speak with the administrator",
    });
  }
};

const savePermissionDefault = async (user) => {
  try {
    // creamos el nuevo permission
    const permission = new Permission();
    // le agregamos el id del usuario que se acaba de registrar
    permission.user = user;
    // seteamos su valor por default
    permission.permission = "VISUALIZACION_DASHBOARDS";
    //guardamos en la dbf
    await permission.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please speak with the administrator",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};

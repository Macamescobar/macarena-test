const Permission = require("../models/Permission");
const User = require("../models/User");
const mongoose = require('mongoose');

//metodo que asocia un permiso a un usuario
const associateToUserById = async (req, res) => {
    // obtenemos el id del usuario que viene por params, por ej /api/users/add/11111-1111-11111
    const userId = req.params.userId;
    // vereficamos que el usuario exista en la base de datos
    const userFound = await User.findOne({_id: userId});
    // si existe procedemos asignarle el permiso
    if (userFound) {
        // obtetnemos el permiso del body
        const permissionToAssign = req.body.permission;
        // ahora buscamos si existe ese permiso para ese usuario
        // por eso usamos dos condiiones del user y permission en la consulta de findOOne
        const isPermissionStored = await Permission.findOne({user: userFound._id, permission: permissionToAssign});
        //si el permiso no existe, entonces creamos uno
        if (!isPermissionStored) {
            // creamos un nuevo permiso con su usuario corresponndientte
            const permissionToSave = new Permission({user: userFound, permission: permissionToAssign});
            permissionToSave.save();
            return res.status(200).json({
                ok: true,
                msg: "Success"
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: "The user already have that permission.",
            });
        }
    }
};

module.exports = {
    associateToUserById
};
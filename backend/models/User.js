const { Schema, model } = require('mongoose');
const uuid = require('uuid')

const userSchema = new Schema({
    // como el enunciado decia uuid generado
    // instalamos la libreria uuid que es para genear id de ese formato
    // y aca la utilizamos para generar el id de tipo uuuid en la base de datos para el usuario
    _id: { type: String, default: uuid.v4() },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    // esto se usa para hacer una referencia que hay relación de usuario con permisos y accesos
    // por alguna razon moongose no pobla los permisos y accesos de forma automatica
    // por esa razon se hace de forma manual en el user.controller.js
    permissions : [{ type: String, ref: 'Permission' }],
    accesses : [{ type: String, ref: 'Access' }]

});

module.exports = model('User', userSchema);

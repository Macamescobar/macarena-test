const { Schema, model } = require('mongoose');

const permissionsSchema = new Schema({
    user: {
        type: String,
        ref: 'User'
    },
    permission: {
        type: String,
        require: true
    },
});

module.exports = model('Permission', permissionsSchema);
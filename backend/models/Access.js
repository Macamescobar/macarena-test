const { Schema, model } = require('mongoose');

const accessSchema = new Schema({
    user: {
        type: String,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = model('Access', accessSchema);
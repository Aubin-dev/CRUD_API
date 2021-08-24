const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

AuthSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Auth', AuthSchema)
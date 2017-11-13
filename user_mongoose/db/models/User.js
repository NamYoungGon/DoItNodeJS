const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = Schema({
    id: String,
    password: String,
    name: String
})

module.exports = mongoose.model('users', UserSchema)
const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = Schema({
    id: String,
    password: String,
    name: String
})

UserSchema.statics.findById = function (id, callback) {
    return this.findOne({ id }).exec(callback)
}

module.exports = mongoose.model('users', UserSchema)
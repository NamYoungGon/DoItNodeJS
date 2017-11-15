const mongoose = require('mongoose')
const crypto = require('crypto')
const { Schema } = mongoose

const UserSchema = Schema({
    id: { type: String, require: true, unique: true },
    name: { type: String, require: true},
    hashed_password: { type: String, require: true },
    salt: { type: String, required: true},
    created_at: { type: Date, index: { unique: false }, default: Date.now() },
    updated_at: { type: Date, index: { unique: false }, default: Date.now() }
})

UserSchema
    .virtual('password')
    .set(function (password) {
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password, this.salt)
    })
    .get(function () {})

UserSchema.statics.findById = function (id, callback) {
    return this.findOne({ id }).exec(callback)
}

UserSchema.methods.makeSalt = function () {
    return String(Math.round((Date.now() * Math.random())))
}

UserSchema.methods.encryptPassword = function (password, salt) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex')
}

UserSchema.methods.authenticate = function (password, { salt, hashed_password }) {
    return this.encryptPassword(password, salt) === hashed_password
}

module.exports = mongoose.model('users11', UserSchema)
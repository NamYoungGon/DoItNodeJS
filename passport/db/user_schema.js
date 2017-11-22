const crypto = require('crypto')

const Schema = {}

Schema.createSchema = function (mongoose) {

    const UserSchema = mongoose.Schema({
        // email: { type: String, required: true, unique: true, default: '' },
        email: { type: String, default: '' },
        name: { type: String, index: 'hashed', default: '' },
        hashed_password: { type: String, required: true, default: '' },
        salt: { type: String, required: true},
        created_at: { type: Date, index: { unique: false }, default: Date.now() },
        updated_at: { type: Date, index: { unique: false }, default: Date.now() }
    })

    UserSchema.path('email').validate((email) => {
        return email.length
    }, 'email 컬럼의 값이 없습니다.')

    UserSchema
        .virtual('password')
        .set(function (password) {
            this.salt = this.makeSalt()
            this.hashed_password = this.encryptPassword(password)
            console.log(`Virtual password 저장됨 : ${this.hashed_password}`)
        })
        .get(function () {
            
        })

    UserSchema.methods.encryptPassword = function (plainText, inSalt = this.salt) {
        if (inSalt) {
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex')
        }
    }

    UserSchema.methods.makeSalt = function () {
        return Math.round(String((new Date().valueOf() * Math.random())))
    }

    UserSchema.methods.authenticate = function (plainText, inSalt, hashed_password) {
        if (inSalt) {
            return this.encryptPassword(plainText, inSalt) === hashed_password
        } else {
            return this.encryptPassword(plainText) === hashed_password
        }
    }

    UserSchema.statics.findByEmail = function (email, callback) {
        return this.findOne({ email }, callback)
    }

    UserSchema.statics.findAll = function (callback) {
        return this.find({}, callback)
    }

    return UserSchema

}

module.exports = Schema
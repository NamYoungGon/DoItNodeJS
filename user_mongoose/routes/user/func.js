const UserModel = require('./../../db/models/User')

const add = (id, password, name, callback) => {
    console.log(`addUser 함수 호출 : ${id}, ${password}, ${name}`)

    const user = new UserModel({ id, password, name })
    user.save((err) => {
        if (err) {
            callback(err, null)
            return false
        }

        callback(null, user)
    })
}

const auth = (id, password, callback) => {
    console.log('authUser 함수 호출')

    UserModel.find({ id, password }, (err, docs) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, docs)
        }
    })
}

module.exports = {
    add,
    auth
}
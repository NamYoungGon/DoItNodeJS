const UserModel = require('./../../db/models/User')

const add = async (id, password, name, callback) => {
    const user = new UserModel({ id, password, name })
    try {
        const result = await user.save()
    } catch (e) {
        console.log('add 함수 에러 발생')
    }
}

const auth = async (id, password, callback) => {
    try {
        const result = await UserModel.findById(id, callback)
    } catch (e) {
        console.log('auth 함수 에러 발생')
    }
}

const update = async (id, password, name, callback) => {
    try {
        const result = await UserModel.findOneAndUpdate({ id, password }, { id, password, name }, callback)
    } catch (e) {
        console.log('update 함수 에러 발생')
    }
}

const remove = async (id, password, callback) => {
    try {
        const result = await UserModel.findOneAndRemove({ id, password }, callback)
    } catch (e) {
        console.log('remove 함수 에러 발생')
    }
}

module.exports = {
    add,
    auth,
    update,
    remove
}
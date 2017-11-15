const crypto = require('crypto')

let user;
// {
    // id: '1111',
    // name: '1111',
    // hashed_password: '',
    // salt: ''
// }

function makeSalt() {
    return String(Math.round(Date.now() * Math.random()))
}

function encyptoPassword(plainText, inSalt) {
    return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex')
}

function authenticate(plainText, inSalt, hashed_password) {
    return encyptoPassword(plainText, inSalt) === hashed_password
}

function addUser() {
    
    let id = '1111'
    let name = '1111'
    let salt = makeSalt()
    let password = '1111'
    let hashed_password = encyptoPassword(password, salt)

    user = {
        id,
        name,
        salt,
        hashed_password
    }

    console.dir(user)
}

addUser()

console.log(authenticate('1111', user.salt, user.hashed_password))
console.log(authenticate('2222', user.salt, user.hashed_password))
const user = require('./user4')()

function showUser() {
    return `${user.id}, ${user.name}`
}

console.log(`사용자 정보 -> ${showUser()}`)
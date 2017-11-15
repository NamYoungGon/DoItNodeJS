const require2 = (path) => {
    const exports = {}
    exports.getUser = () => {
        return {
            id: 'test01',
            name: '소녀시대'
        }
    }
    exports.group = {
        id: 'group01',
        name: '친구'
    }

    return exports
}

const user = require2()

function showUser() {
    return `${user.getUser().name}, ${user.group.name}`
}

console.log(`사용자 정보 -> ${showUser()}`)
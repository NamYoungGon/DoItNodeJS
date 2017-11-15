const database = require('./../../db')
const UserModel = require('./../../db/models/User')

const add = async (req, res) => {
    console.log('/api/user/add 라우팅 호출')

    if (database) {
        const { id, password, name } = req.body
        const user = new UserModel({ id, password, name })

        try {
            const result = await user.save()

            res.send(`
                <h1>저장 성공</h1>
                <p>
                    id : ${id}
                    name: ${name}
                </p>
            `)
        } catch (e) {
            res.send(`<h1>add 함수 에러 발생</h1>`)
        }
    } else {
        res.send(`<h1>데이터베이스에 연결되어 있지 않음</h1>`)
    }
}

const auth = async (req, res) => {
    console.log('/api/user/auth 라우팅 호출')

    if (database) {
        const { id, password } = req.body

        try {
            const result = await UserModel.findById(id)
    
            if (result) {
                const user = new UserModel({ id })
                const authenticated = user.authenticate(password, result)

                if (authenticated)
                    res.send(`<h1>사용자 인증 성공</h1>`)
                else
                    res.send(`<h1>패스워드가 틀립니다.</h1>`)
            } else {
                res.send(`<h1>일치하는 아이디가 없습니다.</h1>`)
            }
        } catch (e) {
            res.send(`<h1>auth 함수 에러 발생</h1>`)
        }

    } else {
        res.send(`<h1>데이터베이스에 연결되어 있지 않음</h1>`)
    }
}

const update = async (req, res) => {
    console.log('/api/user/update 라우팅 호출')

    if (database) {
        const { id, password, name } = req.body

        try {
            const result = await UserModel.findOneAndUpdate({ id, password }, { id, password, name })
    
            if (result) 
                res.send(`<h1>데이터 업데이트가 완료되었습니다.</h1>`)
            else 
                res.send(`<h1>아이디 또는 패스워드가 일치하지 않습니다.</h1>`)
        } catch (e) {
            res.send(`<h1>update 함수 에러 발생</h1>`)
        }
    } else {
        res.send(`<h1>데이터베이스에 연결되어 있지 않습니다.</h1>`)
    }
}

const remove = async (req, res) => {
    console.log('/api/user/remove 라우팅 호출')

    if (database) {
        const { id, password } = req.body

        try {
            const result = await UserModel.findOneAndRemove({ id, password })
    
            if (result) 
                res.send(`<h1>데이터 삭제가 완료되었습니다.</h1>`)
            else 
                res.send(`<h1>아이디 또는 패스워드가 일치하지 않습니다.</h1>`)
        } catch (e) {
            res.send(`<h1>remove 함수 에러 발생</h1>`)
        }

    } else {
        res.send(`<h1>데이터베이스에 연결되어 있지 않습니다.</h1>`)
    }
}

module.exports = {
    add,
    auth,
    update,
    remove
}
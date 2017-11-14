const express = require('express')
const router = express.Router()

const database = require('./../../db')
const { add, auth, update, remove } = require('./func')

router.route('/add').post((req, res) => {
    console.log('/api/user/add 라우팅 호출')
    if (database) {
        const { id, password, name } = req.body

        add(id, password, name, (err, result) => {
            console.log('-------------- add ---------------')

            if (err) {
                res.send(`<h1>에러 발생</h1>`)
            } else if (result) {
                res.send(`
                    <h1>저장 성공</h1>
                    <p>
                        id : ${id}
                        name: ${name}
                    </p>
                `)
            } else {
                res.send(`<h1>추가 실패</h1>`)
            }
        })
    } else {
        res.send(`<h1>데이터베이스에 연결되어 있지 않음</h1>`)
    }
})

router.route('/auth').post((req, res) => {
    console.log('/api/user/auth 라우팅 호출')

    if (database) {
        const { id, password } = req.body

        auth(id, password, (err, docs) => {
            console.log('-------------- auth ---------------')

            if (err) {
                res.send(`<h1>사용자 인증 시 에러 발생</h1>`)
            } else if (docs) {
                if (docs.password === password) {
                    res.send(`<h1>사용자 인증 성공</h1>`)
                } else {
                    res.send(`<h1>패스워드가 틀립니다.</h1>`)
                }
            } else {
                res.send(`<h1>일치하는 아이디가 없습니다.</h1>`)
            }
        })
    } else {
        res.send(`<h1>데이터베이스에 연결되어 있지 않음</h1>`)
    }
})

router.route('/update').post((req, res) => {
    console.log('/api/user/update 라우팅 호출')

    if (database) {
        const { id, password, name } = req.body

        update(id, password, name, (err, docs) => {
            console.log('-------------- update ---------------')

            if (err) {
                res.send(`<h1>데이터 업데이트 중 에러가 발생하였습니다.</h1>`)
            } else if (docs) {
                res.send(`<h1>데이터 업데이트가 완료되었습니다.</h1>`)
            } else {
                res.send(`<h1>아이디 또는 패스워드가 일치하지 않습니다.</h1>`)
            }
        })
    } else {
        res.send(`<h1>데이터베이스에 연결되어 있지 않습니다.</h1>`)
    }
})

router.route('/remove').post((req, res) => {
    console.log('/api/user/remove 라우팅 호출')

    if (database) {
        const { id, password } = req.body

        remove(id, password, (err, docs) => {
            console.log('-------------- remove ---------------')

            if (err) {
                res.send(`<h1>데이터 삭제중 에러가 발생하였습니다.</h1>`)
            } else if (docs) {
                res.send(`<h1>데이터 삭제가 완료되었습니다.</h1>`)
            } else {
                res.send(`<h1>아이디 또는 패스워드가 일치하지 않습니다.</h1>`)
            }
        })
    } else {
        res.send(`<h1>데이터베이스에 연결되어 있지 않습니다.</h1>`)
    }
})

module.exports = router
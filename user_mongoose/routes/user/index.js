const express = require('express')
const router = express.Router()

const database = require('./../../db')
const { add, auth } = require('./func')

router.route('/add').post((req, res) => {
    console.log('/api/user/add 라우팅 호출')
    if (database) {
        const { id, password, name } = req.body
        console.log(`요청 파라미터 : ${id}, ${password}, ${name}`)

        add(id, password, name, (err, result) => {
            if (err) {
                console.log('사용자 저장 시 에러 발생')

                res.send(`<h1>에러 발생</h1>`)

                return false
            } else if (result) {
                console.log(`사용자 저장 성공 : ${id}, ${password}, ${name}`)

                res.send(`
                    <h1>저장 성공</h1>
                    <p>
                        id : ${id}
                        name: ${name}
                    </p>
                `)
            } else {
                console.log('사용자 추가 안됨')

                res.send(`<h1>추가 실패</h1>`)

                return false
            }
            
        })
    } else {
        console.log('데이터베이스에 연결되어 있지 않음')

        res.send(`<h1>데이터베이스에 연결되어 있지 않음</h1>`)

        return false
    }
})

router.route('/auth').post((req, res) => {
    console.log('/api/user/auth 라우팅 호출')

    if (database) {
        const { id, password } = req.body
        console.log(`요청 파라미터 : ${id}, ${password}`)

        auth(id, password, (err, docs) => {
            console.dir(docs)
            if (err) {
                console.log('사용자 인증 시 에러 발생')

                res.send(`<h1>사용자 인증 시 에러 발생</h1>`)
                
                return false
            } else if (docs.length) {
                console.log('사용자 인증 성공')

                res.send(`<h1>사용자 인증 성공</h1>`)
            } else {
                console.log('사용자 인증 실패')

                res.send(`<h1>사용자 인증 실패</h1>`)
                
                return false
            }
        })
    } else {
        console.log('데이터베이스에 연결되어 있지 않음')

        res.send(`<h1>데이터베이스에 연결되어 있지 않음</h1>`)

        return false
    }
})

module.exports = router
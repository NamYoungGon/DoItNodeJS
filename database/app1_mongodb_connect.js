const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

// 에러 핸들러 모듈
const expressErrorHandler = require('express-error-handler')

// mongodb 모듈
const MongoClient = require('mongodb').MongoClient

let database
function connectDB() {
    const databaseUrl = 'mongodb://localhost:27017/local'

    MongoClient.connect(databaseUrl, (err, db) => {
        if (err) {
            console.log('데이터베이스 연결 시 에러 발생함')
            return false
        }

        console.log(`데이터베이스 연결 : ${databaseUrl}`)
        database = db
    })
}


const app = express()
app.set('port', process.env.PORT || 3000)

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressSession({
    secret: 'sdfdsfsf',
    resave: false,
    saveUninitialized: true
}))

const router = express.Router()

router.route('/process/login').post((req, res) => {
    console.log('/process/login 라우팅 함수 호출')

    const paramId = req.body.id || req.query.id
    const paramPassword = req.body.password || req.query.password
    console.log(`요청 파라미터 : ${paramId}, ${paramPassword}`)

    if (database) {
        authUser(database, paramId, paramPassword, (err, docs) => {
            if (err) {
                console.log('에러 발생')

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`
                    <h1>에러 발생</h1> 
                `)
                res.end()
                return false
            } else if (docs) {
                console.dir(docs)

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`
                    <h1>사용자 로그인 성공</h1> 
                    <p>사용자 : ${docs[0].name}</p>
                    <br/>
                    <a href='/login2.html'>다시 로그인 하기</a>
                `)
                res.end()
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`
                    <h1>사용자 데이터 조회 안됨</h1> 
                `)
                res.end()
                return false
            }
        })
    } else {
        console.log('에러 발생')
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
        res.write(`
            <h1>데이터베이스 연결 안됨</h1> 
        `)
        res.end()
    }
})

app.use('/', router)

const authUser = (db, id, password, callback) => {
    console.log(`authUser 호출됨 : ${id}, ${password}`)

    const users = db.collection('users')
    users.find({
        id,
        password
    }).toArray((err, docs) => {
        if (err) {
            callback(err, null)
            return false
        }

        if (docs.length) {
            console.log('일치하는 사용자를 찾음')
            callback(null, docs)
        } else {
            console.log('일치하는 사용자를 찾지 못함')
            callback(null, null)
        }
    })
}

// 404 에러 페이지 처리
const errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
})

app.use(expressErrorHandler.httpError(404))
app.use(errorHandler)

app.listen(app.get('port'), () => {
    console.log('익스프레스 웹서버 실행. 포트 : 3000')

    connectDB()
})
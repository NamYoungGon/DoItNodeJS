const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

// 에러 핸들러 모듈
const expressErrorHandler = require('express-error-handler')

// mongoose 모듈
const mongoose = require('mongoose')

let database
let UserSchema
let UserModel

function connectDB() {
    const databaseUrl = 'mongodb://admin:1234@ds257485.mlab.com:57485/doitnodejs'

    mongoose.Promise = global.Promise
    mongoose.connect(databaseUrl)
    database = mongoose.connection
    
    // 데이터베이스 연결 시 동작
    database.on('open', () => {
        console.log(`데이터베이스에 연결됨 : ${databaseUrl}`)

        UserSchema = mongoose.Schema({
            id: String,
            name: String,
            password: String
        })

        console.log('UserSchema 정의함')

        UserModel = mongoose.model('users', UserSchema)

        console.log('UserModel 정의함')
    })

    database.on('disconnected', () => {
        console.log('데이터베이스 연결 해제')
    })

    database.on('error', console.error.bind(console.log, 'mongoose 연결 에러'))
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

router.route('/process/adduser').post((req, res) => {
    console.log('/process/adduser 라우팅 함수 호출됨')

    const paramId = req.body.id || req.query.id
    const paramPassword = req.body.password || req.query.password
    const paramName = req.body.name || req.query.name

    console.log(`요청 파라미터 : ${paramId} ${paramPassword} ${paramName} `)

    if (database) {
        addUser(database, paramId, paramPassword, paramName, (err, result) => {
            if (err) {
                console.log('에러 발생')

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`
                    <h1>에러 발생</h1> 
                `)
                res.end()
                return false
            } else if (result) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`
                    <h1>사용자 추가 성공</h1> 
                    <p>사용자 : ${paramName}</p>
                `)
                res.end()
            } else {
                console.log('사용자 추가 안됨')
                
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`
                    <h1>사용자 추가 안됨</h1> 
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

    UserModel.find({ id, password }, (err, docs) => {
        if (err) {
            callback(err, null)
            return false;
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

const addUser = (db, id, password, name, callback) => {
    console.log(`addUser 호출됨 : ${id}, ${password}, ${name}`)

    const user = new UserModel({ id, password, name })
    user.save((err) => {
        if (err) {
            callback(err, null)
            return false
        }

        console.log('사용자 데이터 추가함')
        callback(null, user)
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
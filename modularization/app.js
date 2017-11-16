const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

// 에러 핸들러 모듈
const expressErrorHandler = require('express-error-handler')

// 암호화 모듈
const crypto = require('crypto')

// mongoose 모듈
const mongoose = require('mongoose')

let database

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

function connectDB() {
    const databaseUrl = 'mongodb://admin:1234@ds257485.mlab.com:57485/doitnodejs'

    mongoose.Promise = global.Promise
    mongoose.connect(databaseUrl)
    database = mongoose.connection

    // 데이터베이스 연결 시 동작
    database.on('open', () => {
        console.log(`데이터베이스에 연결됨 : ${databaseUrl}`)
        
        createUserSchema(database)
    })
    
    database.on('disconnected', () => {
        console.log('데이터베이스 연결 해제')
    })
    
    database.on('error', console.error.bind(console.log, 'mongoose 연결 에러'))

    app.set('database', database)
}

function createUserSchema(db) {
    db.UserSchema = require('./db/user_schema').createSchema(mongoose)
    db.UserModel = mongoose.model('users3', db.UserSchema)
}

const router = express.Router()
const user = require('./routes/user')

router.route('/process/login').post(user.login)
router.route('/process/adduser').post(user.addUser)
router.route('/process/listuser').post(user.listUser)

app.use('/', router)

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
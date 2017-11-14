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
            id: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            name: { type: String, index: 'hashed' },
            age: { type: Number, default: -1 },
            created_at: { type: Date, index: { unique: false }, default: Date.now() },
            updated_at: { type: Date, index: { unique: false }, default: Date.now() }
        })

        UserSchema.statics.findById = function (id, callback) {
            return this.findOne({ id }).exec(callback)
        }

        UserModel = mongoose.model('users2', UserSchema)
    })

    database.on('disconnected', () => console.log('데이터베이스 연결 해제'))
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

    const { id, password } = req.body
    console.log(`요청 파라미터 : ${id}, ${password}`)

    if (database) {
        authUser(database, id, password, (err, docs) => {
            if (err) {
                res.send(`<h1>에러 발생</h1>`)
            } else if (docs) {
                if (docs.password === password) {
                    res.send(`
                        <h1>사용자 로그인 성공</h1> 
                        <p>사용자 : ${docs.name}</p>
                        <br/>
                        <a href='/login.html'>다시 로그인 하기</a>
                    `)
                } else {
                    res.send(`
                        <h1>패스워드가 일치하지 않음</h1> 
                        <br/>
                        <a href='/login.html'>다시 로그인 하기</a>
                    `)
                }
            } else {
                res.send(`<h1>일치하는 아이디가 없음</h1> `)
            }
        })
    } else {
        res.send(`<h1>데이터베이스 연결 안됨</h1> `)
    }
})

app.use('/', router)

const authUser = async (db, id, password, callback) => {
    console.log(`authUser 호출됨 : ${id}, ${password}`)

    try {
        const results = await UserModel.findById(id, callback);

    } catch (err) {
        // 에러 페이지 호출
    }
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
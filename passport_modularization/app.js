const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

// Passport 모듈
const passport = require('passport')
const flash = require('connect-flash')

// 에러 핸들러 모듈
const expressErrorHandler = require('express-error-handler')

// 설정 파일
const config = require('./config/config')

const database_loader = require('./db/loader')
const route_loader = require('./routes/loader')

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.set('port', config.port || 3000)
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressSession({
    secret: 'sdfdsfsf',
    resave: false,
    saveUninitialized: true
}))

/**
 * ======================================================
 * Passport 영역
 * ======================================================
 */
// Passport 초기화
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

const configPassport = require('./config/passport')
configPassport(app, passport)

const router = express.Router()
route_loader.init(app, router)

const userPassport = require('./routes/user_passport')
userPassport(router, passport)



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

    database_loader.init(app, config)
})
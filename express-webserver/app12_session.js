const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const expressErrorHandler = require('express-error-handler')
const app = express()

const port = 3000
app.set('port', process.env.PORT || port)

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressSession({
    secret: 'my key',
    resave: false,
    saveUninitialized: true
}))

const router = express.Router()

router.route('/process/product').get((req, res) => {
    console.log('/process/product 라우팅 함수 호출됨')

    if (req.session.user) {
        res.redirect('/public/product.html')
    } else {
        res.redirect('/public/login2.html')
    }
})

router.route('/process/login').post((req, res) => {
    console.log('/process/login 라우팅 함수 호출됨')

    const paramId = req.body.id || req.query.id
    const paramPassword = req.body.password || req.query.password

    if (req.session.user) {
        console.log('이미 로그인 되어 있습니다.')
        res.redirect('/public/product.html')
    } else {
        req.session.user = {
            id: paramId,
            name: '소녀시대',
            authorized: true
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' })
        res.write(`
            <h1>로그인 성공</h1>
            <p>아이디 : ${paramId}</p>
            <br>
            <a href='/process/product'>상품페이지</a>
        `)
        res.end()
    }
})

router.route('/process/logout').get((req, res) => {
    console.log('/process/logout 라우팅 함수 호출됨')

    if (req.session.user) {
        console.log('로그아웃')

        req.session.destroy((err) => {
            if (err) {
                console.log('세션 삭제 시 에러 발생')
                return false
            }

            console.log('세션 삭제 성공')
            res.redirect('/public/login2.html')
        })
    } else {
        console.log('로그인이 되어있지 않습니다')
        res.redirect('/public/login2.html')
    }
})

router.route('/process/setUserCookie').get((req, res) => {
    console.log('/process/setUserCookie 라우팅 함수 호출됨')

    res.cookie('user', {
        id: 'mike',
        name: '소녀시대',
        authorized: true
    })

    res.redirect('/process/showCookie')
})

router.route('/process/showCookie').get((req, res) => {
    console.log('/process/showCookie 라우팅 함수 호출됨')

    res.send(req.cookies)
})

router.route('/process/login/:name').post((req, res) => {
    console.log('/process/login/:name 라우팅 함수에서 받음')

    const paramName = req.params.name

    const paramId = req.body.id || req.query.id
    const paramPassword = req.body.password || req.query.password

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' })
    res.write(`
        <h1>서버에서 로그인 응답</h1>
        <div><p>${paramName}</p></div>
        <div><p>${paramId}</p></div>
        <div><p>${paramPassword}</p></div>
    `)
    res.end()
})


app.use('/', router);

const errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
})
app.use(expressErrorHandler.httpError(404))
app.use(errorHandler)

const server = app.listen(app.get('port'), () => {
    console.log('익스프레스 웹서버 실행 : ' + app.get('port'))
})

/*
    GET 방식
        req.query
    POST 방식
        req.body
    URL parameter
        req.params
*/
    
/*
    const router = express.Router()
    router.route(path)...

    get(callback) : GET 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정합니다.
    post(callback) : POST 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정합니다.
    put(callback) : PUT 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정합니다.
    delete(callback) : DELETE 방식으로 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정합니다.
    all(callback) : 모든 요청 방식을 처리하며, 특정 패스 요청이 발생했을 때 사용할 콜백 함수를 지정합니다.

*/
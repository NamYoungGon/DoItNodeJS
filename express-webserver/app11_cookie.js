const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressErrorHandler = require('express-error-handler')
const app = express()

const port = 3000
app.set('port', process.env.PORT || port)

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

const router = express.Router()

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
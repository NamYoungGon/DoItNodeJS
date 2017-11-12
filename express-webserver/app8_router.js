const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const port = 3000
app.set('port', process.env.PORT || port)

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const router = express.Router()
router.route('/process/login').post((req, res) => {
    console.log('/process/login 라우팅 함수에서 받음')

    const paramId = req.body.id || req.query.id
    const paramPassword = req.body.password || req.query.password

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' })
    res.write(`
        <h1>서버에서 로그인 응답</h1>
        <div><p>${paramId}</p></div>
        <div><p>${paramPassword}</p></div>
    `)
    res.end()
})
app.use('/', router);

const server = app.listen(app.get('port'), () => {
    console.log('익스프레스 웹서버 실행 : ' + app.get('port'))
})

/*
    GET 방식
        req.query
    POST 방식
        req.body
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
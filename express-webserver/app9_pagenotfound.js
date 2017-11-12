const express = require('express')
const path = require('path')
const expressErrorHandler = require('express-error-handler')
const app = express()

const port = 3000
app.set('port', process.env.PORT || port)

app.use('/', express.static(path.join(__dirname, 'public')))

const errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
})
app.use(expressErrorHandler.httpError(404))
app.use(errorHandler)

// app.all('*', (req, res) => {
//     res.status(404).send(`
//         <h1>Page not found</h1>
//     `)
// })

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
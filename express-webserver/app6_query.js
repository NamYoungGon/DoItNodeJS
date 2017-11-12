const express = require('express')
const http = require('http')
const app = express()

const port = 3000
app.set('port', process.env.PORT || port)

app.use((req, res, next) => {
    console.log('첫번째 미들웨어 입니다')
    
    const userAgent = req.header('User-Agent')
    const paramName = req.query.name

    res.send(`
        <h3>서버 응답 User-Agent : ${userAgent}</h3>
        <h3>Param Name : ${paramName}</h3>
    `)

/*
    http://localhost:3000/?name=mike&age=20

    req.query -> {"name":"mike","age":"20"}
*/
})

const server = app.listen(app.get('port'), () => {
    console.log('익스프레스 웹서버 실행 : ' + app.get('port'))
})

/*
    GET 방식
        req.query
    POST 방식
        req.body
*/
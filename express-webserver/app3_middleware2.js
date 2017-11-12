const express = require('express')
const http = require('http')
const app = express()

const port = 3000
app.set('port', process.env.PORT || port)

app.use((req, res, next) => {
    console.log('첫번째 미들웨어 입니다.')

    req.user = 'mike'

    next()
})

app.use((req, res, next) => {
    console.log('두번쨰 미들웨어 입니다.')
 
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8;'})
    res.end(`<h1>서버에서 응답한 결과입니다. (${req.user})</h1>`)
})

const server = http.createServer(app).listen(app.get('port'), () => {
    console.log('익스프레스 웹서버 실행!!')
})
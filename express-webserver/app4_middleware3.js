const express = require('express')
const http = require('http')
const app = express()

app.set('port', process.env.PORT || 3000)

app.use((req, res, next) => {
    console.log('첫번째 미들웨어 입니다.')

    req.user = 'Mike'

    next()
})

app.use((req, res, next) => {
    console.log('두번째 미들웨어 입니다.')

    // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})
    // res.end(`<h1>서버에서 응답한 결과입니다. ${req.user}</h1>`)

    // res.send(`<h1>서버에서 응답한 결과입니다. ${req.user}</h1>`)
    const person = { name: '소녀시대', age: 20 }
    // res.send(person)
    const personStr = JSON.stringify(person)
    // res.send(personStr)

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8'})
    res.write(personStr)
    res.end()
})

const server = http.createServer(app).listen(app.get('port'), () => {
    console.log('익스프레스 웹서버 실행')
})
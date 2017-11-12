const express = require('express')
const http = require('http')
const app = express()

const port = 3000
app.set('port', process.env.PORT || port)

app.use((req, res, next) => {
    console.log('첫번째 미들웨어 입니다')
    
    res.redirect('http://google.co.kr')
})

const server = app.listen(app.get('port'), () => {
    console.log('익스프레스 웹서버 실행 : ' + app.get('port'))
})
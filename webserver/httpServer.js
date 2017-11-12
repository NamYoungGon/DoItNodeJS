const http = require('http')

const server = http.createServer()

const host = 'localhost'
const port = 3000
server.listen(port, host, 50000, () => {
    console.log('웹 서버 실행')
})

server.on('connection', (socket) => {
    console.log('클라이언트가 접속했습니다.')
})

server.on('request', (req, res) => {
    console.log('클라이언트 요청이 들어왔습니다.')
    // console.dir(req)

    // 응답으로 보낼 헤더 생성
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })

    // 응답 본문 데이터 생성. 여러번 호출될 수 있음
    res.write('<h1>웹 서버로부터 받은 응답</h1>')

    // 클라이언트로 응답을 전송
    res.end()
})
const http = require('http')

const server = http.createServer()

const host = 'localhost'
const port = 3000
server.listen(port, host, 50000, () => {
    console.log(`웹 서버가 실행되었습니다 -> host: ${host}, port: ${port}`)
})
const express = require('express')
const http = require('http')
const app = express()

const port = 3000
app.set('port', process.env.PORT || port)

const server = http.createServer(app).listen(app.get('port'), () => {
    console.log('익스프레스 웹서버 실행 : ' + app.get('port'))
})

/*
    express app 객체 주요 메소드 및 주요 속성 이름

    set(name, value) : 서버 설정을 위한 속성을 지정합니다. set() 메소드로 지정한 속성은 get() 메소드로 꺼내어 확인할 수 있습니다.
    get(name) : 서버 설정을 위해 지정한 속성을 꺼내 옵니다.
    use([path,], function [, function...]) : 미들웨어 함수를 사용하도록 합니다.
    get([path,], function) : 특정 패스로 요청된 정보를 처리합니다.

    env : 서버 모드를 설정합니다.
    views : 뷰들이 들어 있는 폴더 또는 폴더 배열을 설정합니다.
    view engine : 디폴드로 사용할 뷰 엔진을 설정합니다.
*/
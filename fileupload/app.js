/**
 * 파일 업로드 시 POST 방식으로 요청해야 하며 body-parser 미들웨어 사용 필요
 */

// 파일 업로드용 미들웨어
const multer = require('multer')
const fs = require('fs')

// 클라이언트에서 ajax 로 요청 시 CORS(다중 서버 접속) 지원
const cors = require('cors')

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const app = express()
app.set('port', process.env.PORT || 3000)
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(expressSession({
    secret: 'afdsafasdf',
    resave: false,
    saveUninitialized: true
}))

app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads')
    },
    filename: (req, file, callback) => {
        // callback(null, file.originalname + Date.now())

        // 파일 확장자
        const extension = path.extname(file.originalname)

        // 파일 이름 (확장자 제외)
        const basename = path.basename(file.originalname, extension)

        callback(null, basename + Date.now() + extension)
    }
})

const upload = multer({
    storage,
    limits: {
        files: 10,
        fileSize: 1024 * 1024 * 1024
    }
})

const router = express.Router()

// photo 이름의 파일 객체가 넘어올 때 1개의 파일이라도 배열에 넣도록 설정 (upload.array('photo', 1))
router.route('/process/photo').post(upload.array('photo', 10), (req, res) => { 
    console.log('/process/photo 라우팅 함수 호출됨')

    const files = req.files
    console.log('=== 업로드 된 파일 ===')
    if (files.length) {
        console.dir(files)

/*
    { fieldname: 'photo',
    originalname: '남영곤 2017 자기개발비.zip',
    encoding: '7bit',
    mimetype: 'application/x-zip-compressed',
    destination: 'uploads',
    filename: '남영곤 2017 자기개발비1510540342473.zip',
    path: 'uploads\\남영곤 2017 자기개발비1510540342473.zip',
    size: 1301351 }
*/

    } else {
        console.log('파일이 없습니다.')
    }

    let originalname;
    let filename;
    let mimetype;
    let size;
    if (Array.isArray(files)) {
        for (let i = 0, filesLen = files.length; i < filesLen; i++) {
            originalname = files[i].originalname
            filename = files[i].filename
            mimetype = files[i].mimetype
            size = files[i].size
        }
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8'})
    res.write(`
        <h1>파일 업로드 성공</h1>
        <p>원본파일 : ${originalname}</p>
        <p>저장파일 : ${filename}</p>
    `)
    res.end()
})

app.use('/', router)


app.listen(app.get('port'), () => {
    console.log('익스프레스 웹서버 실행')
})
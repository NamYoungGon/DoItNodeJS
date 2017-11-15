

const login = (req, res) => {
    console.log('/process/login 라우팅 함수 호출')

    const paramId = req.body.id || req.query.id
    const paramPassword = req.body.password || req.query.password
    console.log(`요청 파라미터 : ${paramId}, ${paramPassword}`)

    if (database) {
        authUser(database, paramId, paramPassword, (err, docs) => {
            if (err) {
                console.log('에러 발생')

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>에러 발생</h1> `)
                res.end()
                return false
            } else if (docs) {
                console.dir(docs)

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`
                    <h1>사용자 로그인 성공</h1> 
                    <p>사용자 : ${docs.name}</p>
                    <br/>
                    <a href='/login.html'>다시 로그인 하기</a>
                `)
                res.end()
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>사용자 데이터 조회 안됨</h1> `)
                res.end()
                return false
            }
        })
    } else {
        console.log('데이터베이스 연결 안됨')
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
        res.write(`<h1>데이터베이스 연결 안됨</h1> `)
        res.end()
    }
}

const addUser = (req, res) => {
    console.log('/process/adduser 라우팅 함수 호출됨')

    const paramId = req.body.id || req.query.id
    const paramPassword = req.body.password || req.query.password
    const paramName = req.body.name || req.query.name

    console.log(`요청 파라미터 : ${paramId} ${paramPassword} ${paramName} `)

    if (database) {
        addUser(database, paramId, paramPassword, paramName, (err, result) => {
            if (err) {
                console.log('에러 발생')

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>에러 발생</h1> `)
                res.end()
                return false
            } else if (result) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`
                    <h1>사용자 추가 성공</h1> 
                    <p>사용자 : ${paramName}</p>
                `)
                res.end()
            } else {
                console.log('사용자 추가 안됨')
                
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>사용자 추가 안됨</h1> `)
                res.end()
                return false
            }
        })
    } else {
        console.log('에러 발생')

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
        res.write(`<h1>데이터베이스 연결 안됨</h1> `)
        res.end()
    }
}

const listUser = (req, res) => {
    console.log('/process/listuser 라우팅 호출')

    if (database) {
        UserModel.findAll((err, results) => {
            if (err) {
                console.log('에러 발생')

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>에러 발생</h1> `)
                res.end()
                return false
            } else if (results) {
                console.dir(results)

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })

                let listStr = ''
                let curId
                let curName
                for (var i = 0; i < results.length; i++) {
                    curId = results[i]._doc.id
                    curName = results[i]._doc.name
                    listStr += `<li>#${i} -> ${curId},  ${curName}</li>`
                }
                res.write(`
                    <h3>사용자 리스트</h3>
                    <div><ul>
                    ${listStr}
                    </ul></div>
                `)
                
                res.end()
            } else {
                console.log('조회된 사용자 없음')
                
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>조회된 사용자 없음</h1> `)
                res.end()
                return false
            }
        })
    } else {
        console.log('데이터베이스 연결 안됨')

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
        res.write(`<h1>데이터베이스 연결 안됨</h1> `)
        res.end()
    }
}

module.exports = {
    login,
    addUser,
    listUser
}
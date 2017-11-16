const login = (req, res) => {
    console.log('/process/login 라우팅 함수 호출')

    const database = req.app.get('database')

    const paramId = req.body.id || req.query.id
    const paramPassword = req.body.password || req.query.password
    console.log(`요청 파라미터 : ${paramId}, ${paramPassword}`)


    if (database) {
        auth(database, paramId, paramPassword, (err, docs) => {
            if (err) {
                console.log('에러 발생')

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>에러 발생</h1> `)
                res.end()
                return false
            } else if (docs) {
                console.dir(docs)

                const context = {
                    userid: paramId,
                    username: docs.name
                }

                res.render('login_success', context, (err, html) => {
                   
                })

                // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                // req.app.render('login_success', context, (err, html) => {
                //     if (err) {
                //         console.err('뷰 렌더링 중 에러')

                //         res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                //         res.write(`
                //             <h1>뷰 렌더링 중 에러</h1>
                //             <p>${err}</p>
                //         `)
                //         res.end()

                //         return false
                //     }

                //     res.end(html)
                // })

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

    const database = req.app.get('database')

    const paramId = req.body.id || req.query.id
    const paramPassword = req.body.password || req.query.password
    const paramName = req.body.name || req.query.name

    console.log(`요청 파라미터 : ${paramId} ${paramPassword} ${paramName} `)

    if (database) {
        add(database, paramId, paramPassword, paramName, (err, result) => {
            if (err) {
                console.log('에러 발생')

                res.render('message', {
                    title: 'Error',
                    message: '에러 발생'
                })
            } else if (result) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`
                    <h1>사용자 추가 성공</h1> 
                    <p>사용자 : ${paramName}</p>
                `)
                res.end()
            } else {
                console.log('사용자 추가 안됨')

                res.render('message', {
                    title: 'Error',
                    message: '사용자 추가 안됨'
                })
            }
        })
    } else {
        console.log('에러 발생')

        res.render('message', {
            title: 'Error',
            message: '데이터베이스 연결 안됨'
        })
    }
}

const listUser = (req, res) => {
    console.log('/process/listuser 라우팅 호출')

    const database = req.app.get('database')

    if (database) {
        database.UserModel.findAll((err, results) => {
            if (err) {
                console.log('에러 발생')

                res.render('message', {
                    title: 'Error',
                    message: '에러 발생'
                })
            } else if (results) {
                console.dir(results)

                const context = { results }
                res.render('list_user', context)
                
                res.end()
            } else {
                console.log('조회된 사용자 없음')

                res.render('message', {
                    title: 'Error',
                    message: '조회된 사용자 없음'
                })

                return false
            }
        })
    } else {
        console.log('데이터베이스 연결 안됨')

        res.render('message', {
            title: 'Error',
            message: '데이터베이스 연결 안됨'
        })
    }
}

const auth = (db, id, password, callback) => {
    console.log(`authUser 호출됨 : ${id}, ${password}`)

    db.UserModel.findById(id, (err, results) => {

        if (err) {
            callback(err, null)
            return false
        }

        console.log(`아이디 ${id}로 검색`)
        
        if (results) {
            const user = new db.UserModel({ id })
            console.dir(user)
            const authenticated = user.authenticate(password, results.salt, results.hashed_password)

            if (authenticated) {
                console.log('패스워드 일치')
                callback(null, results)
            } else {
                console.log('패스워드 일치하지 않음')
                callback(null, null)
            }
        } else {
            console.log('일치하는 아이디 사용자 없음')
        }
    })
}

const add = (db, id, password, name, callback) => {
    console.log(`addUser 호출됨 : ${id}, ${password}, ${name}`)

    const user = new db.UserModel({ id, password, name })
    user.save((err) => {
        if (err) {
            callback(err, null)
            return false
        }

        console.log('사용자 데이터 추가함')
        callback(null, user)
    })
}

module.exports = {
    login,
    addUser,
    listUser
}
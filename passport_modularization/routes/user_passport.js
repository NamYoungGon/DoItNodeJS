module.exports = (router, passport) => {

    // 회원가입 및 로그인 라우팅 함수
    router.route('/').get((req, res) => {
        console.log('/ 요청')

        res.render('index.ejs')
    })

    router.route('/login').get((req, res) => {
        console.log('/login get 요청')

        res.render('login.ejs', { message: req.flash('loginMessage') })
    })
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))

    router.route('/signup').get((req, res) => {
        console.log('/signup get 요청')

        res.render('signup.ejs', { message: req.flash('signupMessage')})
    })
    router.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }))

    router.route('/profile').get((req, res) => {
        console.log('/profile get 요청')

        console.log('req.user 객체 정보')
        console.dir(req.user)

        if (!req.user) {
            console.log('사용자 인증 안된 상태')
            res.redirect('/')
        } else {
            console.log('사용자 인증된 상태')

            res.render('profile.ejs', { user: Array.isArray(req.user) ? req.user[0] : req.user })
        }
    })

    router.route('/logout').get((req, res) => {
        console.log('/logout get 요청')

        req.logout()
        res.redirect('/')
    })

}
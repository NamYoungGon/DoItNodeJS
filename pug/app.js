const express = require('express')

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { username: 'devgon' })
})

app.listen(3000, () => {
    console.log('express server port 3000')
})

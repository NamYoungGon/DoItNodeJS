const express = require('express')
const path = require('path')

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { path: 'views/index.ejs' })
})

app.get('/test', (req, res) => {
    res.render('test/index', { path: 'views/test/index.ejs', arr: ['test1', 'test2', 'test3'] })
})

app.listen(3000, () => {
    console.log('express server port 3000')
})
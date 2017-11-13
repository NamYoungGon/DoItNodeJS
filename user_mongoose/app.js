const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')

const database = require('./db')
const router = require('./routes')

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', router)

app.listen(app.get('port'), () => {
    console.log('익스프레스 웹서버 실행')
    database()
})


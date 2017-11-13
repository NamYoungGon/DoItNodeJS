const express = require('express')
const router = express.Router()
const userRoute = require('./user')

router.use('/api/user', userRoute)

module.exports = router
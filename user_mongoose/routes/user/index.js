const express = require('express')
const router = express.Router()

const { add, auth, update, remove } = require('./func')

router.route('/add').post(add)
router.route('/auth').post(auth)
router.route('/update').post(update)
router.route('/remove').post(remove)

module.exports = router
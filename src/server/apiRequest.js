let express = require('express')
let pool = require('./db/mysqlConnection')

const router = express.Router()

router.get('/', (req, res) => res.send("akash"))

module.exports = router


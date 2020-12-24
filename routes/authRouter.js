const express = require('express')
const authRouter = express.Router()
const urlJSONParser = require('body-parser').json()
const authUser = require('../controllers/authController').authUser

//================================== FOR ADMIN ===========================
//=============================== Authorization  ==============================
authRouter.post('/', urlJSONParser, authUser, (req, res) => { res.status(200).json(res.locals.dataUser) })

module.exports = authRouter
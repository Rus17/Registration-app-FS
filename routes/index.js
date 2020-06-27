const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: true});
const urlJSONParser = bodyParser.json()

const settParticipant = require('./conference_registration').settParticipant
const getUsersAndParticipants = require('./users_of_db').getUsersAndParticipants
const updateUser = require('./users_of_db').updateUser
const authUser = require('./users_of_db').authUser
const delUser = require('./users_of_db').delUser

const sendMail = require('./sendMail')
const validateParticipant = require("./validateParticipant")


//================================ FOR PARTICIPANTS ===========================
//=============================== Registration  ===============================
router.post(
   '/conf_registration', 
   urlJSONParser, 
   validateParticipant, 
   sendMail, 
   settParticipant
)


//================================== FOR ADMIN ===========================
//=============================== Authorization  ==============================
router.post('/admin', urlJSONParser, authUser, getUsersAndParticipants)

//=============================== Get users list  ==============================
//router.get('/users', getUsers)

//=============================== Update user ===================================
router.put('/admin/update_user', urlJSONParser, updateUser)

//=============================== Delete user ===================================
router.delete('/admin/del_user/:id', delUser)


module.exports = router


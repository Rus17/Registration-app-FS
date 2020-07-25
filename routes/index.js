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
const addUser = require('./users_of_db').addUser

const sendMail = require('./sendMail')
const validateParticipant = require("./validateParticipant")
const validateUser = require("./validateUser")


//================================ FOR PARTICIPANTS ===========================
//=============================== Registration  ===============================
router.post('/conf_registration', 
  urlJSONParser, 
  validateParticipant, 
  settParticipant
)


//================================== FOR ADMIN ===========================
//=============================== Authorization  ==============================
router.post('/admin', urlJSONParser, authUser, getUsersAndParticipants)

//=============================== Get users list  ==============================
//router.get('/users', getUsers)




//=============================== Update user ===================================
router.put('/admin/users', urlJSONParser, updateUser)

//=============================== Delete user ===================================
router.delete('/admin/users/:id', delUser)

//=============================== Add user ===================================
router.post('/admin/users', urlJSONParser, validateUser, addUser)


module.exports = router


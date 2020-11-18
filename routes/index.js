const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const urlJSONParser = bodyParser.json()

const settParticipant = require('./conference_registration').settParticipant
const getUsers = require('./users_of_db').getUsers
const updateUser = require('./users_of_db').updateUser
const authUser = require('./users_of_db').authUser
const delUser = require('./users_of_db').delUser
const addUser = require('./users_of_db').addUser
const modUser = require('./users_of_db').modUser

const getParticipants = require('./participants_of_db').getParticipants
const setParticipantStatus = require('./participants_of_db').setParticipantStatus

const sendMail = require('./sendMail')
const validateParticipant = require("./validateParticipant")
const validateUser = require("./validateUser")


//================================ FOR PARTICIPANTS ===========================
//=============================== Registration  ===============================
router.post('/conf_registration',
  urlJSONParser,
  validateParticipant,
  settParticipant,
  sendMail,
  (req, res) => { res.status(200).send("Data is valid") }
)

//================================== FOR ADMIN ===========================
//=============================== Authorization  ==============================
router.post('/admin', urlJSONParser, authUser, (req, res) => { res.status(200).json(res.locals.dataUser) })


//================================== USERS ======================================
//=============================== Modification user ==============================
router.put('/admin/user/:UserID', urlJSONParser, modUser)

//=============================== Get users list  ==============================
router.get('/admin/users', urlJSONParser, getUsers)

//=============================== Update user status ===================================
router.patch('/admin/users/:id', urlJSONParser, updateUser)



//=============================== Delete user ===================================
router.delete('/admin/users/:id', delUser)

//=============================== Add user ===================================
router.post('/admin/users', urlJSONParser, validateUser, addUser)


//================================== PARTICIPANTS ======================================
//=============================== Get participants list  ==============================
router.get('/admin/participants/:sort/:pageSize/:currentPage/:filter', urlJSONParser, getParticipants)

//=============================== Set participant status ==============================
router.patch('/admin/participant/:id', urlJSONParser, setParticipantStatus, sendMail, (req, res) => { res.sendStatus(200) })




module.exports = router


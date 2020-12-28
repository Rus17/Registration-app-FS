const express = require('express')
const registrationParticRouter = express.Router()
const urlJSONParser = require('body-parser').json()
const sendMail = require('../utils/sendMail')
const settParticipant = require('./registrationController').settParticipant
const validateParticipant = require('./registrationController').validateParticipant

//================================ FOR PARTICIPANTS ===========================
//=============================== Registration  ===============================
registrationParticRouter.post('/',
  urlJSONParser,
  validateParticipant,
  settParticipant,
  sendMail,
  (req, res) => { res.status(200).send("Data is valid") }
)

module.exports = registrationParticRouter
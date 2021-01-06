const express = require('express')
const registrationParticRouter = express.Router()
const urlJSONParser = require('body-parser').json()
const sendMail = require('../utils/sendMail')
const settParticipant = require('./registrationController').settParticipant
const validator = require('../utils/fieldValidator').validator

//================================ FOR PARTICIPANTS ===========================
//=============================== Registration  ===============================
registrationParticRouter.post('/',
  urlJSONParser,
  validator,
  settParticipant,
  sendMail,
  (req, res) => { res.status(200).send("Data is valid") }
)

module.exports = registrationParticRouter
const express = require('express')
const registrationParticRouter = express.Router()
const urlJSONParser = require('body-parser').json()

const sendMail = require('./sendMail')
// const validateParticipant = require("./validateParticipant")
const settParticipant = require('../controllers/registrationParticController').settParticipant
const validateParticipant = require('../controllers/registrationParticController').validateParticipant

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
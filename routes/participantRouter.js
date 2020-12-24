const express = require('express')
const urlJSONParser = require('body-parser').json()
// const urlJSONParser = bodyParser.json()
const participantRouter = express.Router()

// const settParticipant = require('../controllers/registrationParticController').settParticipant
const getParticipants = require('../controllers/participantController').getParticipants
const setParticipantStatus = require('../controllers/participantController').setParticipantStatus
const sendMail = require('./sendMail')


//================================== PARTICIPANTS ======================================
//=============================== Get participants list  ==============================
participantRouter.get('/:sort/:pageSize/:currentPage/:filter/:fieldName?/:search?', urlJSONParser, getParticipants)

//=============================== Set participant status ==============================
participantRouter.patch('/:id', urlJSONParser, setParticipantStatus, sendMail, (req, res) => { res.sendStatus(200) })


module.exports = participantRouter
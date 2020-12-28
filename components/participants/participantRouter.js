const express = require('express')
const urlJSONParser = require('body-parser').json()
const participantRouter = express.Router()
const getParticipants = require('./participantController').getParticipants
const setParticipantStatus = require('./participantController').setParticipantStatus
const sendMail = require('../utils/sendMail')


//================================== PARTICIPANTS ======================================
//=============================== Get participants list  ==============================
participantRouter.get('/:sort/:pageSize/:currentPage/:filter/:fieldName?/:search?', urlJSONParser, getParticipants)

//=============================== Set participant status ==============================
participantRouter.patch('/:id', urlJSONParser, setParticipantStatus, sendMail, (req, res) => { res.sendStatus(200) })


module.exports = participantRouter
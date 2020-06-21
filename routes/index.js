const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: true});
const urlJSONParser = bodyParser.json()

const settParticipant = require('./conference_registration').settParticipant
const getUsersAndParticipants = require('./users_of_db').getUsersAndParticipants
const authUser = require('./users_of_db').authUser

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
router.put('/admin/update_user', updateUser)




// //=============================== Root ===================================
// router.get('/', (req, res) => {
//   if (req.cookies.token) {res.redirect("/My_favorite_cities")
//   } else {res.render("loginForm", {logReg: 'log'})}
// })

// //=============================== Choose_cities ===================================
// router.get('/Choose_cities_on', tokenVerifier, gettingCities, (req, res) => {
//   res.render("ChooseCities.hbs", {name: res.locals.userName, listCities: res.locals.arrCities})
// })

module.exports = router


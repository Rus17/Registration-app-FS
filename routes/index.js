const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended: true});
const urlJSONParser = bodyParser.json()

const settParticipant = require('./conference_registration').settParticipant
const getUsers = require('./users_of_db').getUsers
const authUser = require('./users_of_db').authUser


const sendMail = require('./sendMail')
const validateParticipant = require("./validateParticipant")

// router.options('*', (req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set("Access-Control-Allow-Headers", "Content-Type");
//   res.send('ok');
// });


//=============================== Root ===================================
// router.post('/user', urlJSONParser, (req, res) => {
//   console.log("req.params.id", req.params.id)
//   console.log("request.query.id", req.query.id)
//   console.log("request.query.id", req.body.id)
//   res.send(req.params.id)
//

//================================ FOR PARTUCUPANTS ===========================
//=============================== Registration  ===============================
router.post('/conf_registration', urlJSONParser, validateParticipant, settParticipant) //sendMail


//=============================== Authorization  ==============================
router.post('/admin', urlJSONParser, authUser)




//================================== FOR SUPER ADMIN ===========================
//=============================== Get users list  ==============================
router.get('/users', getUsers)




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


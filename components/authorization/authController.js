const db = require('../../app')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//======================== authUser =========================
module.exports.authUser = (req, res, next) => {

  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  const userData = [req.body.email]
  const sql = "SELECT * FROM Users WHERE email=?"

  db.connection.query(sql, userData, (err, results, fields) => {    // 1. Checking the login

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    if (results.length === 0) {
      res.status(401).send('User with this email is not registered')
      return
    }

    if (results[0].status === "blocked") { //blocked || active
      res.status(403).send('Your account has been deactivated. Contact your super administrator.')
      return
    }

    bcrypt.compare(req.body.passwd, results[0].passwd, (err, result) => {   // 2. Checking the password
      if (!result) {
        console.log("error passwd")
        res.status(403).send('Invalid password')
        return
      }

      let payload = { first_name: results[0].first_name, email: results[0].email }

      const dataUser = {
        userID: results[0].userID,
        role: results[0].admin_role,
        name: results[0].first_name,
        email: results[0].email,
        token: jwt.sign(payload, process.env.PRIVATE_KEY)
      }
      res.locals.dataUser = dataUser
      next()
    })
  })
}


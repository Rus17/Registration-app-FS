const db = require('../../app')
const bcrypt = require('bcrypt')

//======================== authUser =========================
module.exports.authUser = (req, res, next) => {

  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  const userData = [req.body.email]
  //, req.body.passwd]
  const sql = "SELECT * FROM Users WHERE Email=?"
  // AND Passwd=?"

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    if (results.length === 0) {
      res.status(401).send('User with this email is not registered')
      return
    }

    if (results[0].Status === "blocked") { //blocked || active
      res.status(403).send('Your account has been deactivated. Contact your super administrator.')
      return
    }


    bcrypt.compare(req.body.passwd, results[0].Passwd, function (err, result) {
      if (!result) {
        console.log("error passwd")
        res.status(403).send('Invalid password')
        return
      }

      const dataUser = { role: results[0].Role, name: results[0].First_Name, email: results[0].Email }
      res.locals.dataUser = dataUser
      next()
    })

    // if (!auth) {
    //   res.status(403).send('Invalid password')
    //   console.log("password is error")
    //   return
    // }



    // const dataUser = { role: results[0].Role, name: results[0].First_Name, email: results[0].Email }

    // res.locals.dataUser = dataUser

    // console.log("auth - successful")
    // next()
    // res.status(200).json(dataUser)
  })
}

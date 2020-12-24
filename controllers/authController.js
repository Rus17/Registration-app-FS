const db = require('../server')

//======================== authUser =========================
module.exports.authUser = (req, res, next) => {
  console.log("authUser req", req.body)
  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  const userData = [req.body.email, req.body.passwd]
  const sql = "SELECT * FROM Users WHERE Email=? AND Passwd=?"

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    if (results.length === 0) {
      res.status(401).send('Data is not correct')
      return
    }

    if (results[0].Status === "blocked") { //blocked || active
      res.status(403).send('Your account has been deactivated. Contact your super administrator.')
      return
    }

    const dataUser = { role: results[0].Role, name: results[0].First_Name, email: results[0].Email }

    res.locals.dataUser = dataUser
    next()
    // res.status(200).json(dataUser)
  })
}

// const jwt = require('jsonwebtoken')
// const secretOrPrivateKey = 'q1w2e3r4t5y6u7i8o9p0'
// const bcrypt = require('bcrypt')
// const db = require('../server')

// module.exports.accountChecker = (req, res, next) => {
//   const sql = 'SELECT * FROM UserWether WHERE UserName = ?'
//   db.connection.query(sql, req.body.login, (err, results, fields) => { 

//   })
// }


// module.exports.registrar = (req, res, next) => {
//   //Create a new account in the DB if there is no such user
//   const sql = "SELECT UserName FROM UserWether WHERE UserName = ?"
//   db.connection.query(sql, req.body.login, (err, results, fields) => {

//   })
// }



//=========================================================
// const jwt = require('jsonwebtoken')
// const secretOrPrivateKey = 'q1w2e3r4t5y6u7i8o9p0'
// const bcrypt = require('bcrypt')
// const db = require('../server')

// module.exports.accountChecker = (req, res, next) => {
//   const sql = 'SELECT * FROM UserWether WHERE UserName = ?'
//   db.connection.query(sql, req.body.login, (err, results, fields) => {    
//     if (!err && results.length > 0){ 
//       bcrypt.compare(req.body.pass, results[0].Passwd, function(err, result) {
//         if(result == true){
//           let payload = {Name: results[0].UserName, Email: results[0].Email}        
//           let token = jwt.sign(payload, secretOrPrivateKey)
//           res.locals.token = token
//           next()

//         } else {
//           res.status(403).send('Password error')
//         }
//       })
//     } else {
//       res.status(403).send('Login error')
//     }
//   })
// }


// module.exports.registrar = (req, res, next) => {
//   //Create a new account in the DB if there is no such user
//   const sql = "SELECT UserName FROM UserWether WHERE UserName = ?"
//   db.connection.query(sql, req.body.login, (err, results, fields) => {
//     if (!err){
//       if(results.length > 0){
//         res.status(403).send('A user with this name is already registered. Choose a different name.')
//       } else {
//         // Create a password hash
//         bcrypt.hash(req.body.pass, 10, function(err, hash) {
//           if (err){res.sendStatus(500)}
//           else {
//             // We write all the data of the new user to the DB
//             const userData = [req.body.login, req.body.email, hash];
//             const sql = "INSERT INTO UserWether(UserName, Email, Passwd) VALUES(?, ?, ?)"  
//             db.connection.query(sql, userData, (err, results, fields) => {
//               if (!err){console.log(results)
//               } else {console.log(err)}
//             })
//             // We generate a token and send it to the browser
//             let payload = {Name: req.body.login, Email: req.body.email}
//             let token = jwt.sign(payload, secretOrPrivateKey)
//             res.locals.token = token
//             next()

//           }
//         })        
//       }    
//     } else {res.send(err)}
//   })
// }
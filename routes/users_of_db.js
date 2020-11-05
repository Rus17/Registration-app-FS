const express = require('express')
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

//======================== Get Users =========================
module.exports.getUsers = (req, res, next) => {
  const sql = "SELECT UserID, First_Name, Last_Name, Email, Role, Status FROM Users"
  db.connection.query(sql, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }
    res.status(200).json(results)
  })
}

//======================== Modification User =========================
module.exports.modUser = (req, res, next) => {

  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  if (req.body.Role === 'super_admin') {
    if (req.body.auth !== req.body.Email) {
      const sql = `DELETE FROM Users WHERE Role="super_admin"`
      db.connection.query(sql, (err, results, fields) => {
        if (err) {
          console.log("error1 :", err)
          res.status(403).send('DB error')
          return
        }
      })
    }
  }

  let sql = `UPDATE Users SET 
  Email=?,
  Role=?, 
  First_Name=?, 
  Last_Name=?, 
  Status=? WHERE UserID=${req.params.UserID}`

  const userData = [
    req.body.Email,
    req.body.Role,
    req.body.First_Name,
    req.body.Last_Name,
    req.body.Status
  ]

  if (req.body.Passwd) {
    sql = sql.replace(' WHERE', ', Passwd=? WHERE')
    userData.push(req.body.Passwd)
  }

  console.log("sql", sql)
  console.log("userData", userData)

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    res.sendStatus(200)
  })
}

//======================== Update User Status =========================
module.exports.updateUser = (req, res, next) => {

  // console.log("req.body", req.body)
  // console.log("req.params.UserID", req.params)
  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  const sql = "UPDATE Users SET Status=? WHERE UserID=?"
  const userData = [req.body.status, req.params.id]

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    res.sendStatus(200)
  })
}

//======================== Delete User =========================
module.exports.delUser = (req, res, next) => {
  if (!req.params.id) {
    res.status(403).send('no data')
    return
  }

  const sql = "DELETE FROM Users WHERE UserID=?"
  db.connection.query(sql, req.params.id, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    res.sendStatus(200)
  })
}

//======================== Add User =========================
module.exports.addUser = (req, res, next) => {
  console.log("req :", req.body)
  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  const sql = "SELECT * FROM Users WHERE Email=?"
  db.connection.query(sql, req.body.Email, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    if (results.length > 0) {
      let errors = {}
      errors.Email = "A user with this email is already registered"
      console.log("errors.Email inner: ", errors.Email)
      res.status(400).json(errors)
      return
    }

    if (req.body.Role === 'super_admin') {
      const sql = `DELETE FROM Users WHERE Role="super_admin"`
      db.connection.query(sql, (err, results, fields) => {
        if (err) {
          console.log("error1 :", err)
          res.status(403).send('DB error')
          return
        }
      })
    }


    const sql = `INSERT INTO Users (
      Email, Passwd, Role, First_Name, Last_Name, Status) 
      VALUES (?, ?, ?, ?, ?, ?)`

    const userData = [
      req.body.Email,
      req.body.Passwd,
      req.body.Role,
      req.body.First_Name,
      req.body.Last_Name,
      req.body.Status
    ]

    db.connection.query(sql, userData, (err, results, fields) => {

      if (err) {
        console.log("error1 :", err)
        res.status(403).send('DB error')
        return
      }
      res.status(200).send({ insertId: results.insertId })
    })


  })

}

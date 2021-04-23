const db = require('../../app')
const bcrypt = require('bcrypt')
// const validator = require('validator')
const jwt = require('jsonwebtoken');
require('dotenv').config()

//======================== Get an array of users =========================
module.exports.getUsers = (req, res, next) => {

  const sql = "SELECT userID, first_name, last_name, email, admin_role, status FROM Users"
  db.connection.query(sql, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).json({ error: 'DB error' })
      return
    }

    res.status(200).json(results)
  })
}

//====================== Update User Status =======================
module.exports.updateUser = (req, res, next) => {

  if (Object.keys(req.body).length == 0) {
    res.status(403).json({ error: 'no data' })
    return
  }

  const sql = "SELECT * FROM Users WHERE userID=? AND admin_role=?"
  const userData = [req.params.id, "super_admin"]


  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error1: ", err)
      res.status(403).json({ error: 'DB error' })
      return
    }

    // При попытке заблокировать суперадмина возвращаем ошибку
    if (results.length && req.body.status === 'blocked') {
      res.status(403).json({ error: 'It is not possible to block superadmin' })
      return
    }

    const sql2 = "UPDATE Users SET status=? WHERE userID=?"
    const userData2 = [req.body.status, req.params.id]

    db.connection.query(sql2, userData2, (err, results, fields) => {

      if (err) {
        console.log("error1 :", err)
        res.status(403).json({ error: 'DB error' })
        return
      }
      res.sendStatus(200)
    })
  })

}

//======================== Delete User ===========================
module.exports.delUser = (req, res, next) => {

  if (!req.params.id) {
    res.status(403).json({ error: 'no data' })
    return
  }

  const sql = "SELECT * FROM Users WHERE userID=? AND admin_role=?"
  const userData = [req.params.id, "super_admin"]

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error1: ", err)
      res.status(403).json({ error: 'DB error' })
      return
    }

    //При попытке удалить суперадмина возвращаем сообщение об ошибке
    if (results.length) {
      res.status(403).json({ error: 'Unable to remove super administrator' })
      return
    }

    const sql2 = "DELETE FROM Users WHERE userID=?"
    db.connection.query(sql2, req.params.id, (err, results, fields) => {

      if (err) {
        console.log("error1: ", err)
        res.status(403).json({ error: 'DB error' })
        return
      }
    })

    res.sendStatus(200)
  })
}


//========================== Add User ============================
module.exports.addUser = (req, res, next) => {

  if (Object.keys(req.body).length == 0) {
    res.status(403).json({ error: 'no data' })
    return
  }

  const sql = "SELECT * FROM Users WHERE email=?"

  //При попытке создать заблокированного суперадмина - ошибка 
  if (req.body.admin_role === 'super_admin' && req.body.status === 'blocked') {
    res.status(403).json({ error: 'Unable to create blocked superadmin' })
    return
  }

  //Check if there is already such an address in the database
  db.connection.query(sql, req.body.email, (err, results, fields) => {
    // console.log("addUser 2")
    if (err) {
      console.log("error :", err)
      res.status(403).json({ error: 'DB error' })
      return
    }

    // If such an address already exists, send an error
    if (results.length > 0) {
      let errors = {}
      errors.email = "A user with this email is already registered"
      res.status(400).json(errors)
      return
    }

    // Hash the password and add a new user to the database
    //============== Async version ==============
    bcrypt.hash(req.body.passwd, 10, (err, hash) => {

      if (err) {
        console.log("error1 :", err)
        res.status(403).json({ error: 'hash error' })
        return
      }

      const sql = `INSERT INTO Users (
        email, passwd, admin_role, first_name, last_name, status) 
        VALUES (?, ?, ?, ?, ?, ?)`

      const userData = [
        req.body.email,
        hash,
        req.body.admin_role,
        req.body.first_name,
        req.body.last_name,
        req.body.status
      ]

      db.connection.query(sql, userData, (err, results, fields) => {

        if (err) {
          console.log("error2 :", err)
          res.status(403).json({ error: 'DB error' })
          return
        }

        res.locals.insertId = results.insertId
        next()
      })
    })
  })
}

//====================== Modification User =======================
module.exports.modUser = (req, res, next) => {

  if (Object.keys(req.body).length == 0) {
    res.status(403).json({ error: 'no data' })
    return
  }

  // При попытке заблокировать суперадмина возвращаем ошибку
  if (req.body.admin_role === 'super_admin' && req.body.status === 'blocked') {
    res.status(403).json({ error: 'Unable to block superadmin' })
    return
  }

  const userData = [req.body.userID]
  const sql = `SELECT * FROM Users WHERE userID=? AND admin_role="super_admin"`

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error21: ", err)
      res.status(403).json({ error: 'DB error' })
      return
    }

    // При попытке изменить статус суперадмина на админа  возвращаем ошибку
    if (results.length && req.body.admin_role === 'admin') {
      res.status(403).json({ error: 'It is impossible to change the status of the superadmin' })
      return
    }

    const userData2 = [
      req.body.email,
      req.body.admin_role,
      req.body.first_name,
      req.body.last_name,
      req.body.status
    ]

    let sql2 = `UPDATE Users SET 
        email=?,
        admin_role=?, 
        first_name=?, 
        last_name=?, 
        status=? WHERE userID=${req.params.userID}`

    //If the request contains a password, hash it and add it to the request for the database
    if (req.body.passwd) {
      const hash = bcrypt.hashSync(req.body.passwd, 10)
      sql2 = sql2.replace(' WHERE', ', passwd=? WHERE')
      userData2.push(hash)
    }

    db.connection.query(sql2, userData2, (err, results, fields) => {

      if (err) {
        console.log("error22: ", err)
        res.status(403).send('DB error')
        return
      }

      next()
      // res.sendStatus(200)
    })

  })
}



//===================== Verifier Admin Token =======================
module.exports.verifierAdmin = (req, res, next) => {

  if (!req.headers.authorization) {
    res.status(403).json({ error: 'no token' })
    return
  }
  // Decode the token and look for a user in the database
  const decoded = jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY)
  const userData = [decoded.first_name, decoded.email]
  const sql = 'SELECT * FROM Users WHERE first_name = ? AND email = ?'

  db.connection.query(sql, userData, (err, results, fields) => {
    if (err) {
      console.log("error verifierAdmin :", err)
      res.status(403).json({ error: 'DB error' })
      return
    }

    if (results.length < 1) {
      res.status(403).json({ error: 'Token is not valid' })
      return
    }
    next()
  })
}

//=================== Verifier Super-Admin Token ===================
module.exports.verifierSuperAdmin = (req, res, next) => {

  if (!req.headers.authorization || req.headers.authorization === "undefined") {
    res.status(403).json({ error: 'no token' })
    return
  }

  console.log("req.headers.authorization: ", req.headers.authorization)
  console.log("type: ", typeof (req.headers.authorization))

  // Decode the token and look for a user in the database
  const decoded = jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY)

  const userData = [decoded.first_name, decoded.email, 'super_admin']
  const sql = `SELECT * FROM Users WHERE first_name = ? AND email = ? AND admin_role = ?`

  db.connection.query(sql, userData, (err, results, fields) => {
    if (err) {
      console.log("error verifierSuperAdmin:", err)
      res.status(403).json({ error: 'DB error' })
      return
    }

    if (results.length < 1) {
      res.status(403).json({ error: 'Token is not valid' })
      return
    }
    next()
  })
}


//=================== Removing excess superadmin ===================
module.exports.removeSuperadmin = (req, res, next) => {

  if (Object.keys(req.body).length == 0) {
    res.status(403).json({ error: 'no data' })
    return
  }

  //If we add a new superadmin or change the old admin to superadmin, 
  // then we need to delete the current superadmin
  if (req.body.admin_role === 'super_admin') {

    const sql = `DELETE FROM Users WHERE admin_role="super_admin" AND email != "${req.body.email}"`

    db.connection.query(sql, (err, results, fields) => {
      if (err) {
        console.log("error removeSuperadmin:", err)
        res.status(403).json({ error: 'DB error' })
        return
      }
    })
  }

  if (res.locals.insertId) res.status(200).send({ insertId: res.locals.insertId })
  else res.sendStatus(200)
}

const db = require('../../app')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken');
require('dotenv').config()

//======================== Get Users =========================
module.exports.getUsers = (req, res, next) => {
  console.log("4444444444_getUsers starts")
  //Произвести поиск пользователя с именем и имейлом из токена, если false, то отправить ошибку.

  const sql = "SELECT userID, first_name, last_name, email, admin_role, status FROM Users"
  db.connection.query(sql, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    console.log("4444444444_getUsers successfully")
    res.status(200).json(results)
  })
}

//====================== Modification User =======================
module.exports.modUser = (req, res, next) => {
  // console.log("headers", req.headers)
  // console.log("authorization", req.headers.authorization)

  console.log("4444444444_modUser starts")

  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  const userData = [
    req.body.email,
    req.body.admin_role,
    req.body.first_name,
    req.body.last_name,
    req.body.status
  ]

  let sql = `UPDATE Users SET 
        email=?,
        admin_role=?, 
        first_name=?, 
        last_name=?, 
        status=? WHERE userID=${req.params.userID}`

  //If the request contains a password, hash it and add it to the request for the database
  if (req.body.passwd) {
    const hash = bcrypt.hashSync(req.body.passwd, 10)
    sql = sql.replace(' WHERE', ', passwd=? WHERE')
    userData.push(hash)
  }

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error3 :", err)
      res.status(403).send('DB error')
      return
    }

    console.log("4444444444_modUser successfully")
    res.sendStatus(200)
  })
}

//====================== Update User Status =======================
module.exports.updateUser = (req, res, next) => {
  console.log("4444444444_updateUser starts")

  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  const sql = "UPDATE Users SET status=? WHERE userID=?"
  const userData = [req.body.status, req.params.id]

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    console.log("4444444444_updateUser successfully")
    res.sendStatus(200)
  })
}

//======================== Delete User ===========================
module.exports.delUser = (req, res, next) => {

  console.log("4444444444_delUser starts")
  if (!req.params.id) {
    res.status(403).send('no data')
    return
  }

  const sql = "DELETE FROM Users WHERE userID=?"
  db.connection.query(sql, req.params.id, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    console.log("4444444444_delUser successfully")
    res.sendStatus(200)
  })
}

//========================== Add User ============================
module.exports.addUser = (req, res, next) => {
  console.log("4444444444_addUser starts")

  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  const sql = "SELECT * FROM Users WHERE email=?"

  //Check if there is already such an address in the database
  db.connection.query(sql, req.body.email, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    // If such an address already exists, send an error
    if (results.length > 0) {
      let errors = {}
      errors.email = "A user with this email is already registered"
      console.log("errors.email inner: ", errors.email)
      res.status(400).json(errors)
      return
    }

    // If the new user is a super-admin, then delete the current super-admin from the database
    if (req.body.admin_role === 'super_admin') {
      const sql = `DELETE FROM Users WHERE admin_role="super_admin"`
      db.connection.query(sql, (err, results, fields) => {
        if (err) {
          console.log("error1 :", err)
          res.status(403).send('DB error')
          return
        }
      })
    }

    // Hash the password and add a new user to the database

    //============== Sync version ==============
    // const hash = bcrypt.hashSync(req.body.passwd, 10)

    // const sql = `INSERT INTO Users (
    //     email, passwd, admin_role, first_name, last_name, status) 
    //     VALUES (?, ?, ?, ?, ?, ?)`

    // const userData = [
    //   req.body.email,
    //   hash,
    //   req.body.admin_role,
    //   req.body.first_name,
    //   req.body.last_name,
    //   req.body.status
    // ]

    // db.connection.query(sql, userData, (err, results, fields) => {
    //   if (err) {
    //     console.log("error1 :", err)
    //     res.status(403).send('DB error')
    //     return
    //   }

    //   console.log("4444444444_addUser successfully")
    //   res.status(200).send({ insertId: results.insertId })
    // })

    //============== Async version ==============
    bcrypt.hash(req.body.passwd, 10, (err, hash) => {

      if (err) {
        console.log("error1 :", err)
        res.status(403).send('hash error')
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
          console.log("error1 :", err)
          res.status(403).send('DB error')
          return
        }

        console.log("4444444444_addUser successfully")
        res.status(200).send({ insertId: results.insertId })
      })
    })
  })
}

//===================== Verifier Admin Token =======================
module.exports.verifierAdmin = (req, res, next) => {

  console.log("1111111111_verifierAdmin starts")

  if (!req.headers.authorization) {
    res.status(403).send('no token')
    return
  }

  const decoded = jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY)
  console.log("decoded", decoded)

  const userData = [decoded.first_name, decoded.email]
  const sql = 'SELECT * FROM Users WHERE first_name = ? AND email = ?'

  db.connection.query(sql, userData, (err, results, fields) => {
    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    console.log("results: ", results)

    if (results.length < 1) {
      console.log("Token is not valid")
      res.status(403).send('Token is not valid')
      return
    }
    console.log("1111111111_verifierAdmin successfully")
    next()
  })
}

//=================== Verifier Super-Admin Token ===================
module.exports.verifierSuperAdmin = (req, res, next) => {

  console.log("1111111111_verifierSuperAdmin starts")

  if (!req.headers.authorization) {
    res.status(403).send('no token')
    return
  }

  const decoded = jwt.verify(req.headers.authorization, process.env.PRIVATE_KEY)
  console.log("decoded", decoded)

  const userData = [decoded.first_name, decoded.email, 'super_admin']
  const sql = `SELECT * FROM Users WHERE first_name = ? AND email = ? AND admin_role = ?`

  db.connection.query(sql, userData, (err, results, fields) => {
    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }
    console.log("results SA: ", results)
    if (results.length < 1) {
      console.log("Token is not valid")
      res.status(403).send('Token is not valid')
      return
    }

    console.log("1111111111_verifierSuperAdmin successfully")
    next()
  })
}

//=================== Removing excess superadmin ===================
module.exports.removeSuperadmin = (req, res, next) => {

  console.log("2222222222_removeSuperadmin starts")

  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  if (req.body.admin_role === 'super_admin') {
    // console.log("req.body.auth :", req.body.auth)
    // console.log("req.body.Email :", req.body.Email)
    if (req.body.auth !== req.body.email) {


      const sql = `DELETE FROM Users WHERE admin_role="super_admin"`
      db.connection.query(sql, (err, results, fields) => {
        if (err) {
          console.log("error2 :", err)
          res.status(403).send('DB error')
          return
        }
        console.log("2222222222_removeSuperadmin YES successfully")
        next()
      })
    }
  }
  console.log("2222222222_removeSuperadmin NO successfully")
  next()
}
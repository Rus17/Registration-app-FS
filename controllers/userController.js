const db = require('../server')
const validator = require('validator')

//======================== Get Users =========================
module.exports.getUsers = (req, res, next) => {
  console.log("userRouter2")
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

module.exports.validateUser = (req, res, next) => {
  // console.log("req.body", req.body)
  const data = req.body
  let errors = {};

  //  data.name = typeof data.name === 'string' && data.name.trim().length === 0 ? '' : data.name;

  if (data.Email) {
    if (!validator.isLength(data.Email, { min: 5, max: 50 })) {
      errors.Email = 'Email must be 10 characters'
    }
    if (!validator.isEmail(data.Email)) {
      errors.Email = 'Email must be in "xxx@xxx.xx" format'
    }
  } else { errors.Email = 'Email field is required.' }

  if (data.Passwd) {
    if (!validator.isLength(data.Passwd, { min: 6, max: 20 })) {
      errors.Passwd = 'Password must be between 6 and 20 characters'
    }
    if (!validator.isAlphanumeric(data.Passwd)) {
      errors.Passwd = 'Password must contain only latin characters'
    }
  } else { errors.Passwd = 'Password field is required.' }

  if (data.Role) {
    if (data.Role !== "admin" && data.Role !== "super_admin") {
      errors.Role = 'Role field must be "admin" or "super_admin"'
    }
  } else { errors.Role = 'Role field is required.' }

  if (data.First_Name) {
    if (!validator.isLength(data.First_Name, { min: 3, max: 20 })) {
      errors.First_Name = 'First Name must be between 3 and 20 characters'
    }
    if (!validator.isAlpha(data.First_Name)) {
      errors.First_Name = 'First Name must contain only latin characters'
    }
  } else { errors.First_Name = 'First Name field is required.' }

  if (data.Last_Name) {
    if (!validator.isLength(data.Last_Name, { min: 3, max: 20 })) {
      errors.Last_Name = 'Last Name must be between 3 and 20 characters'
    }
    if (!validator.isAlpha(data.Last_Name)) {
      errors.Last_Name = 'Last Name must contain only latin characters'
    }
  } else { errors.lName = 'Last Name field is required.' }

  if (data.Status) {
    if (data.Status !== "active" && data.Status !== "blocked") {
      errors.Status = 'Status field must be "active" or "blocked"'
    }
  } else { errors.Status = 'Status field is required.' }

  if (Object.keys(errors).length > 0) {
    console.log("Error User", errors)
    res.status(400).json(errors)
    return
  }

  console.log("Data is valid")
  next()

}
const express = require('express')
const db = require('../server')

//======================== authUser =========================
module.exports.authUser = (req, res, next) => {
  if (Object.keys(req.body).length == 0) { 
    res.status(403).send('no data')
    return
  }
  
  const userData = [req.body.email, req.body.passwd]  
  const sql = "SELECT * FROM Users WHERE Email=? AND Passwd=?"

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err){
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }
    
    if(results.length === 0){
      res.status(401).send('Data is not correct')
      return 
    }
    
    if (results[0].Status === "blocked"){ //blocked || active
      res.status(403).send('Your account has been deactivated. Contact your super administrator.')
      return
    } 
    
    const dataUser = {role: results[0].Role, fName: results[0].First_Name}
    
    res.locals.dataUser = dataUser
    next()
//    res.status(200).json(dataUser)
  })
}


//======================== Get Users and Participants =========================
module.exports.getUsersAndParticipants = (req, res, next) => {
  if (Object.keys(req.body).length == 0) { 
    res.status(403).send('no data')
    return
  }
  
  const dataUser = res.locals.dataUser
  let participantList
    
  if(dataUser.role === "super_admin" || dataUser.role === "admin"){
    const sql = "SELECT * FROM Participants"
    db.connection.query(sql, (err, results, fields) => {
      console.log("Hi query!")
      if (err){
        console.log("error1 :", err)
        res.status(403).send('DB error')
        return
      }    

      participantList = results
      
        if(dataUser.role === "super_admin"){
          const sql = "SELECT * FROM Users"
          db.connection.query(sql, (err, results, fields) => {

            if (err){
              console.log("error1 :", err)
              res.status(403).send('DB error')
              return
            }
            
            const combinedResponse = {
              dataUser,
              userList: results,
              participantList
            }

            res.status(200).json(combinedResponse)
          })
        }
      
      if(dataUser.role === "admin"){
        const combinedResponse = {
              dataUser,
              participantList
            }

        res.status(200).json(combinedResponse)
      }      
    })
  }
}

//======================== Update User Status =========================
module.exports.updateUser = (req, res, next) => {
  if (Object.keys(req.body).length == 0) { 
    res.status(403).send('no data')
    return
  }

  const sql = "UPDATE Users SET Status=? WHERE UserID=?"
  const userData = [req.body.status, req.body.id]
  db.connection.query(sql, userData, (err, results, fields) => {
    
    if (err){
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
    
    if (err){
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }
    
    res.sendStatus(200)
  })
  
}

//======================== Add User =========================
module.exports.addUser = (req, res, next) => {
  if (Object.keys(req.body).length == 0) { 
    res.status(403).send('no data')
    return
  }  
    
  let sql = "SELECT * FROM Users WHERE Email=?"  
  db.connection.query(sql, req.body.Email, (err, results, fields) => {

    if (err){
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }
    
    if(results.length > 0){
      let errors = {}
      errors.Email = "A user with this email is already registered"
      console.log("errors.Email inner: ", errors.Email)
      res.status(400).json(errors)
      return
    }
    
    sql = `INSERT INTO Users (
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

      if (err){
        console.log("error1 :", err)
        res.status(403).send('DB error')
        return
      }
      res.status(200).send({insertId: results.insertId})
    })
  })
  
}

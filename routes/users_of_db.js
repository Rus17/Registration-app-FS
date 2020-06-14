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
  
  console.log("res: ", res.locals.dataUser)
  
  let combinedResponse
  
  if(res.locals.dataUser.role === "super_admin"){
    const sql = "SELECT * FROM Users"
    db.connection.query(sql, (err, results, fields) => {

      if (err){
        console.log("error1 :", err)
        res.status(403).send('DB error')
        return
      }    

      console.log("res.locals.dataUser.First_Name: ", res.locals.dataUser.fName)
      console.log("results: ", results)

      combinedResponse = {
        dataUser: res.locals.dataUser,
        userList: results
      }

      res.status(200).json(combinedResponse)
    })
  }
  
  
}


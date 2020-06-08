const express = require('express')
const db = require('../server')

module.exports.getUsers = (req, res, next) => {

  // ===== If data has not arrived, then return an error
  if (Object.keys(req.body).length == 0) { 
    res.status(403).send('no data')
    return
  }
  
  const sql = "SELECT * FROM Users"

  // ==================== query to the DB =======================
  db.connection.query(sql, (err, results, fields) => {

    if (err){
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }
    
    
//    next()
    console.log("results: ", results)
//    res.status(200).json(results)
  })
}

//======================== authUser =========================

module.exports.authUser = (req, res, next) => {
  // ===== If data has not arrived, then return an error
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
      res.status(403).send('Data is not correct')
      return 
    }
    
    const dataUser = {Role: results[0].Role, fName: results[0].First_Name}    
    
    res.status(200).json(dataUser)
  })
}




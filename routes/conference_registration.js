const express = require('express')
const db = require('../server')

module.exports.settParticipant = (req, res, next) => {
  console.log("settParticipant", req.body)

  // ===== If data has not arrived, then return an error
  if (Object.keys(req.body).length == 0) { 
    res.status(403).send('no data')
    return
  }
  
  //=========== We get the current date ===========
  let currentDate = new Date();
  let setDate = String(currentDate.getFullYear())
  setDate += ` ${currentDate.getMonth() + 1}`
  setDate += ` ${currentDate.getDate()}`

  //============ Generate data for the DB ===========
  const userData = [
    req.body.fName,
    req.body.lName,
    req.body.arrivalDate,
    req.body.departureDate,
    req.body.company,
    req.body.position,
    req.body.sex,
    req.body.birthdate,
    req.body.email,
    req.body.role,
    'new',
    setDate,
    req.body.country,
  ]

  // const sql = "INSERT INTO Participants(
  //   First_Name,
  //   Last_Name,
  //   Date_of_arrival,
  //   Date_of_departure,
  //   Company,
  //   Position,
  //   Sex,
  //   Birthdate,
  //   Email,
  //   Role_Conf,
  //   Status,
  //   Registration_date,      
  //   Country) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

  const sql = "INSERT INTO Participants(First_Name, Last_Name, Date_of_arrival, Date_of_departure, Company, Position, Sex, Birthdate, Email, Role_Conf, Status, Registration_date, Country) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

  // ==================== query to the DB =======================
  db.connection.query(sql, userData, (err, results, fields) => {

    if (err){
      console.log("error1")
      res.status(403).send('DB error')      
      return
    }

    console.log("results", results)

    // может быть преобразовать в json
    const added_participant = results
    // Отправить объект нового участника на фронт
    res.locals.added_participant = added_participant
    next()
  })


}








// module.exports.gettingCities = (req, res, next) => {
//   //Get the list of user cities from the DB
//   const sql = 'SELECT Cities FROM UserWether WHERE UserName = ?'
//   let arrCities
//   db.connection.query(sql, res.locals.userName, (err, results, fields) => {
//     if (!err) {
//       if(results[0].Cities){
//         arrCities = results[0].Cities.split("|")
//       }
//       res.locals.arrCities = arrCities
//       next()

//     } else res.sendStatus(403)
//   })   
// }
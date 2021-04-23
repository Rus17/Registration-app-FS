const db = require('../../app')

module.exports.settParticipant = (req, res, next) => {

  // ===== If data has not arrived, then return an error
  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  //=========== We get the current date ===========
  let currentDate = new Date();
  let setDate = String(currentDate.getFullYear())
  setDate += `-${currentDate.getMonth() + 1}`
  setDate += `-${currentDate.getDate()}`

  //============ Generate data for the DB ===========
  const userData = [req.body.email]
  const sql = "SELECT * FROM Participants WHERE email=?"

  // ==================== query to the DB =======================

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).json({ Error: 'DB error' })
      return
    }

    if (results.length) {
      console.log("false")
      res.status(401).json({ generalError: 'A member with this email is already registered' })
      return
    }

    const sql2 = `INSERT INTO Participants(
      first_name,
      last_name,
      date_of_arrival,
      date_of_departure,
      company,
      position,
      sex,
      birthdate,
      email,
      role,
      status,
      registration_date,      
      country) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const userData2 = [
      req.body.first_name,
      req.body.last_name,
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

    db.connection.query(sql2, userData2, (err, results, fields) => {

      if (err) {
        console.log("error1 :", err)
        res.status(403).json({ Error: 'DB error' })
        return
      }

      res.locals.status = 'new'
      next()
    })
  })
}
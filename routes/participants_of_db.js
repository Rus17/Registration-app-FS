const db = require('../server')

//======================== Get  Participants =========================
module.exports.getParticipants = (req, res, next) => {

  const sql = `SELECT * FROM Participants ORDER BY ${req.params.sort} LIMIT ${req.params.currentPage}, ${req.params.pageSize}`
  db.connection.query(sql, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    const sql2 = 'SELECT COUNT(*) FROM Participants'
    db.connection.query(sql2, (err, resultCount, fields) => {

      if (err) {
        console.log("error1 :", err)
        res.status(403).send('DB error')
        return
      }

      const results2 = resultCount[0]['COUNT(*)']
      res.status(200).json({ participants: results, totalParticipantsCount: results2 })

    })
    // console.log("resultsCount2", results2)
    // {
    //   users: [ ... ],
    //   page: 3,
    //   limit: 20,
    //   totalParticipantsCount: 450,
    // }
  })
}

//======================== set Participant Status =========================
module.exports.setParticipantStatus = (req, res, next) => {
  // console.log("setParticipants", req.params.id)
  // console.log("setParticipants", req.body)

  if (!req.params.id) {
    res.status(403).send('no data')
    return
  }

  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  const sql = "UPDATE Participants SET Status=? WHERE UserID=?"
  const userData = [req.body.status, req.params.id]

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }
    res.locals.status = req.body.status
    next()
    // res.sendStatus(200)
  })
}
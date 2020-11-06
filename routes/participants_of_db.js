const db = require('../server')

//======================== Get  Participants =========================
module.exports.getParticipants = (req, res, next) => {
  // console.log("req :", req.params.sort, req.params.currentPage, req.params.pageSize, req.params.filter)

  let order = 'ASC'
  let sort = req.params.sort

  if (sort.slice(-4) === '!rev') {
    const arrSort = sort.split('!')
    sort = arrSort[0]
    order = 'DESC'
  }

  let primaryParticipant
  if (req.params.currentPage === 1) {
    primaryParticipant = req.params.currentPage--
  } else {
    primaryParticipant = (req.params.currentPage - 1) * req.params.pageSize
  }

  const sql = `SELECT * FROM Participants ORDER BY ${sort} ${order} LIMIT ${primaryParticipant}, ${req.params.pageSize}`
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
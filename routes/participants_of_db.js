const db = require('../server')

//======================== Get  Participants =========================
module.exports.getParticipants = (req, res, next) => {

  const sql = "SELECT * FROM Participants"
  db.connection.query(sql, (err, results, fields) => {
    console.log("getParticipants")

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    res.status(200).json(results)
  })
}

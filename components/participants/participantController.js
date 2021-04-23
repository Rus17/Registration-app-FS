const db = require('../../app')

//======================== Get  Participants =========================
module.exports.getParticipants = (req, res, next) => {

  let order = 'ASC'                   // By default, we set the direct sort order
  let sort = req.params.sort

  if (sort.slice(-4) === '!rev') {    // Checking and Reversing the Sort Order
    const arrSort = sort.split('!')
    sort = arrSort[0]
    order = 'DESC'
  }
  // ============== Определяем номер первой запись для текущей страницы для запроса sql ==============
  let primaryParticipant
  if (req.params.currentPage === 1) {
    primaryParticipant = req.params.currentPage--
  } else {
    primaryParticipant = (req.params.currentPage - 1) * req.params.pageSize
  }

  // ================ Формируем условие для запроса учитывая "фильтр" и "поиск"======================
  let condition = ""

  // Если указан только фильтр, то пересоставляем условие.
  if (req.params.filter !== "All" && req.params.search === "undefined") {
    condition = `WHERE Status="${req.params.filter}"`
  }

  // Если указан только поиск, то пересоставляем условие.
  if (req.params.search !== "undefined" && req.params.filter === "All" && req.params.fieldName !== 'first_name') {
    condition = `WHERE ${req.params.fieldName} LIKE "%${req.params.search}%"`
  }

  // Если указан только поиск по полю First_Name, то пересоставляем условие.
  if (req.params.search !== "undefined" && req.params.fieldName === 'first_name' && req.params.filter === "All") {
    condition = `WHERE ${req.params.fieldName} LIKE "%${req.params.search}%" 
    OR Last_Name LIKE "%${req.params.search}%"`
  }

  // Если указан и фильтр, и поиск, то пересоставляем условие.
  if (req.params.filter !== "All" && req.params.search !== "undefined" && req.params.fieldName !== 'first_name') {
    condition = `WHERE ${req.params.fieldName} LIKE "%${req.params.search}%" 
    AND Status="${req.params.filter}"`
  }

  // Если указан и фильтр по полю First_Name, и поиск, то пересоставляем условие.
  if (req.params.search !== "undefined" && req.params.fieldName === 'first_name' && req.params.filter !== "All") {
    condition = `WHERE ${req.params.fieldName} LIKE "%${req.params.search}%" AND Status="${req.params.filter}"
    OR Last_Name LIKE "%${req.params.search}%" AND Status="${req.params.filter}"`
  }
  // ===================================================================================================== /

  // Составляем запрос
  let sql = `SELECT * FROM Participants ${condition} ORDER BY ${sort} ${order} LIMIT ${primaryParticipant}, ${req.params.pageSize}`

  // Делаем запрос, - получаем сортированный по нужному полю, отфильтрованный и ограниченный список участников
  db.connection.query(sql, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }

    let sql2 = `SELECT COUNT(*) FROM Participants ${condition}`
    // Делаем еще один запрос, чтобы определить, сколько всего записей в таблице с указанными условиями (для пагинатора).
    db.connection.query(sql2, (err, resultCount, fields) => {

      if (err) {
        console.log("error1 :", err)
        res.status(403).send('DB error')
        return
      }

      const results2 = resultCount[0]['COUNT(*)']

      res.status(200).json({ participants: results, totalParticipantsCount: results2 })
    })
  })
}

//======================== set Participant Status =========================
module.exports.setParticipantStatus = (req, res, next) => {

  if (!req.params.id || req.params.id === 'undefined') {
    res.status(403).send('no data')
    return
  }

  if (Object.keys(req.body).length == 0) {
    res.status(403).send('no data')
    return
  }

  const sql = "UPDATE Participants SET status=? WHERE userID=?"
  const userData = [req.body.status, req.params.id]

  db.connection.query(sql, userData, (err, results, fields) => {

    if (err) {
      console.log("error1 :", err)
      res.status(403).send('DB error')
      return
    }
    res.locals.status = req.body.status
    next()
  })
}


const express = require('express')
const app = express()
var mariadb = require('mariadb/callback')
// const bodyparser = require('body-parser')

// app.use("/api", require("./api"))
var cors = require('cors')
// const gettingCities = require('./requestsSQL').gettingCities
// const registrar = require('./authentication').registrar
app.use(cors())
app.use("/", require("./routes/index"))

// app.options('*', (req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set("Access-Control-Allow-Headers", "Content-Type");
//   res.send('ok');
// });

const connection = mariadb.createPool({
  host: 'localhost',
  user: 'Ruslan',
  password: 'testpasswd',
  database: 'conference'
})

app.listen(4000, () => console.log('Express server is runnig at port no: 4000'))

module.exports.connection = connection

//==========================================

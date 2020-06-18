require('dotenv').config()
const express = require('express')
const app = express()
var mariadb = require('mariadb/callback')
// const bodyparser = require('body-parser')

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

const connection = mariadb.createConnection({   //const connection = mariadb.createConnection()
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB
})

app.listen(process.env.PORT, () => console.log('Express server is runnig at port no: 4000'))

module.exports.connection = connection

//==========================================

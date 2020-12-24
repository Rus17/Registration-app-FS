require('dotenv').config()
const express = require('express')
const app = express()
const mariadb = require('mariadb/callback')
const cors = require('cors')
const userRouter = require("./routes/userRouter")
const participantRouter = require("./routes/participantRouter")
const registrationParticRouter = require("./routes/registrationParticRouter")
const authRouter = require("./routes/authRouter")


app.use(cors())
app.use("/admin/users", userRouter)
app.use("/admin/participants", participantRouter)
app.use("/registration", registrationParticRouter)
app.use("/admin/auth", authRouter)


const connection = mariadb.createConnection({   //const connection = mariadb.createConnection()
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB
})

app.listen(process.env.PORT, () => console.log('Express server is runnig at port no: 4000'))

module.exports.connection = connection

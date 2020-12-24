const express = require('express')
const userRouter = express.Router()
const urlJSONParser = require('body-parser').json()

const getUsers = require('../controllers/userController').getUsers
const updateUser = require('../controllers/userController').updateUser
const delUser = require('../controllers/userController').delUser
const addUser = require('../controllers/userController').addUser
const modUser = require('../controllers/userController').modUser
const validateUser = require('../controllers/userController').validateUser
// const validateUser = require("./validateUser")


//=============================== Modification user ==============================
userRouter.put('/:UserID', urlJSONParser, modUser)

//=============================== Get users list  ==============================
userRouter.get('/', urlJSONParser, getUsers)

//=============================== Update user status ===================================
userRouter.patch('/:id', urlJSONParser, updateUser)

//=============================== Delete user ===================================
userRouter.delete('/:id', delUser)

//=============================== Add user ===================================
userRouter.post('/', urlJSONParser, validateUser, addUser)

module.exports = userRouter
const express = require('express')
const userRouter = express.Router()
const urlJSONParser = require('body-parser').json()

const getUsers = require('./userController').getUsers
const updateUser = require('./userController').updateUser
const delUser = require('./userController').delUser
const addUser = require('./userController').addUser
const modUser = require('./userController').modUser
const validateUser = require('./userController').validateUser


//=============================== Modification user ==============================
userRouter.put('/:UserID', urlJSONParser, validateUser, modUser)

//=============================== Get users list  ==============================
userRouter.get('/', urlJSONParser, getUsers)

//=============================== Update user status ===================================
userRouter.patch('/:id', urlJSONParser, updateUser)

//=============================== Delete user ===================================
userRouter.delete('/:id', delUser)

//=============================== Add user ===================================
userRouter.post('/', urlJSONParser, validateUser, addUser)

module.exports = userRouter
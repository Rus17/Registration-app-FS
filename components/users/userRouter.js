const express = require('express')
const userRouter = express.Router()
const urlJSONParser = require('body-parser').json()

const getUsers = require('./userController').getUsers
const updateUser = require('./userController').updateUser
const delUser = require('./userController').delUser
const addUser = require('./userController').addUser
const modUser = require('./userController').modUser
const validator = require('../utils/fieldValidator').validator
const verifierAdmin = require('./userController').verifierAdmin
const verifierSuperAdmin = require('./userController').verifierSuperAdmin
const removeSuperadmin = require('./userController').removeSuperadmin


//=============================== Modification user ==============================
userRouter.put('/:userID', urlJSONParser, verifierSuperAdmin, removeSuperadmin, validator, modUser)

//=============================== Get users list  ==============================
userRouter.get('/', urlJSONParser, verifierAdmin, getUsers)

//=============================== Update user status ===================================
userRouter.patch('/:id', urlJSONParser, verifierSuperAdmin, updateUser)

//=============================== Delete user ===================================
userRouter.delete('/:id', verifierSuperAdmin, delUser)

//=============================== Add user ===================================
userRouter.post('/', urlJSONParser, verifierSuperAdmin, removeSuperadmin, validator, addUser)

module.exports = userRouter
import { takeEvery, put, call } from "redux-saga/effects"
import { users } from "../../api/api"
import {
  GET_PARTICIPANTS, GET_USERS, UPDATE_USER_STATUS, AUTHORIZATION_S_ADMIN, 
  AUTHORIZATION_SAGA, AUTHORIZATION_ADMIN, LOGOUT, AUTH_ERROR, UPDATE_USER_SAGA,
  DEL_USER_SAGA, ADD_USER, ADD_USER_SAGA, USER_ERROR, PRELOADER, REDIRECT,
  DEL_USER
} from "../actionTypes/typesUsers"

//======================= AC =======================
//======================= Get user list ==============
const getUsersAC = (payload) => {
  return ({
    type: GET_USERS,
    payload
  })
}

//================ Update user status=============== 
const updateUserStatusAC = (payload) => {
  return ({
    type: UPDATE_USER_STATUS,
    payload
  })
}

//================ Del user =============== 
const delUserAC = (payload) => {
  return ({
    type: DEL_USER,
    payload
  })
}

//======================= Set preloader ==============
const preloaderAC = (payload) => {
  return ({
    type: PRELOADER,
    payload
  })
}

//======================= Set redirect ==============
export const redirectAC = (payload) => {
  return ({
    type: REDIRECT,
    payload
  })
}

//======================= Get participants list ==============
 const getParticipantsAC = (payload) => {
   return ({
     type: GET_PARTICIPANTS,
     payload
   })
}
//======================= auth super admin ===============
 const authorizationSadminAC = () => {
   return ({
     type: AUTHORIZATION_S_ADMIN
   })
}
 
//======================= auth admin ===============
 const authorizationAdminAC = (payload) => {
   return ({
     type: AUTHORIZATION_ADMIN,
     payload
   })
}
 
//======================= Logout ===============
 export const logoutAC = () => {
   return ({
     type: LOGOUT
   })
 }
 
//================ Authorisation Error ===============
 const authErrorAC = (payload) => {
  return ({
    type: AUTH_ERROR,
    payload
  })
}
 
//================ Add user =============== 
const addUsersAC = (payload) => {
   return ({
    type: ADD_USER,
    payload
  })
}

//================ User error=============== 
export const userErrorAC = (payload) => {
   return ({
    type: USER_ERROR,
    payload
  })
}

//===================== CS ====================== 
 
 export const authorization_SAGA = (payload) => {
   return ({
     type: AUTHORIZATION_SAGA,
     payload
   })
 }
 
export const updateUser_SAGA = (payload) => {
  return ({
    type: UPDATE_USER_SAGA,
    payload
  })
}

export const delUser_SAGA = (payload) => {
  return ({
    type: DEL_USER_SAGA,
    payload
  })
}

export const addUser_SAGA = (payload) => {
  return ({
    type: ADD_USER_SAGA,
    payload
  })
}
 
 
 //============================== Sagas ==============================
 
 //======================= Authorization =======================
function* authorizationSaga(dataAction) {
  try {
    const response = yield call(() => {return users.authorizationAPI(dataAction.payload)})
    if(response.data.dataUser.role === "super_admin"){
      yield put(authorizationSadminAC())
      yield put(getUsersAC(response.data.userList))
      yield put(getParticipantsAC(response.data.participantList))
    } else {
      yield put(authorizationAdminAC(response.data.dataUser.fName))
      yield put(getParticipantsAC(response.data.participantList))
    }
     
  }
  catch(error){
    console.log("error", error)
    yield put(authErrorAC(error.response.data))
  }
}
 
export function* watchAuthorizationSaga() {
  yield takeEvery(AUTHORIZATION_SAGA, authorizationSaga)
}
 
 
//======================= Update Users =======================
function* updateUsersSaga(dataAction) {
  
  try {    
    const response = yield call(() => {
      return users.updateUserAPI({
        id: dataAction.payload.id, 
        status: dataAction.payload.newStatus
      })
    })
    if(response.data === "OK"){
      yield put(updateUserStatusAC(dataAction.payload))
    }     
  }
  catch(error){
    yield put(authErrorAC(error.response.data))
  }
}
 
export function* watchUpdateUsersSaga() {
  yield takeEvery(UPDATE_USER_SAGA, updateUsersSaga)
}

//======================= Del User =======================
function* delUserSaga(dataAction) {
  console.log("dataAction", dataAction)
  try {    
    const response = yield call(() => {
      return users.delUserAPI(dataAction.payload)
    })
    if(response.data === "OK"){
      yield put(delUserAC(dataAction.payload))
    }     
  }
  catch(error){
    yield put(authErrorAC(error.response.data))
  }
}
 
export function* watchDelUserSaga() {
  yield takeEvery(DEL_USER_SAGA, delUserSaga)
}


//======================= Add User =======================
function* addUserSaga(dataAction) {
  
  try {
    yield put(preloaderAC(true))
    const response = yield call(() => {
      return users.addUserAPI(dataAction.payload)
    })
    
    if(response.data.insertId){
      dataAction = {...dataAction.payload, UserID: response.data.insertId}
      yield put(addUsersAC(dataAction))
      yield put(preloaderAC(false))
      yield put(redirectAC(true))
      yield put(userErrorAC({}))
    }     
  }
  catch(error){
    yield put(preloaderAC(false))
    yield put(userErrorAC(error.response.data))
  }
}
 
export function* watchAddUserSaga() {
  yield takeEvery(ADD_USER_SAGA, addUserSaga)
}
 
 
 
 
 
 
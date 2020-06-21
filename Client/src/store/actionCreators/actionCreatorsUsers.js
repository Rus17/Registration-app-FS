import { takeEvery, put, call } from "redux-saga/effects"
import {authorizationAPI, updateUserAPI} from "../../api/api"
import {
   GET_PARTICIPANTS, GET_USERS, AUTHORIZATION_S_ADMIN, AUTHORIZATION_SAGA,
   AUTHORIZATION_ADMIN, LOGOUT, AUTH_ERROR, UPDATE_USERS, UPDATE_USER_SAGA
 } from "../actionTypes/typesUsers"

//======================= AC =======================
//======================= Get user list ==============
const getUsersAC = (payload) => {
   return ({
     type: GET_USERS,
     payload
   })
 }

//======================= Update user list ==============
const updateUsersAC = (payload) => {
   return ({
     type: UPDATE_USERS,
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
 
 
 //============================== Sagas ==============================
 
 //======================= Authorization =======================
function* authorizationSaga(dataAction) {
  try {
    const response = yield call(() => {return authorizationAPI(dataAction.payload)})
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
    yield put(authErrorAC(error.response.data))
  }
}
 
export function* watchAuthorizationSaga() {
  yield takeEvery(AUTHORIZATION_SAGA, authorizationSaga)
}
 
 
 //======================= Update Users =======================
function* updateUsersSaga(dataAction) {
  
  try {
    const updatedUser = dataAction.payload.newUserList.filter((user) => {
      return user.UserID === dataAction.payload.id
    })
    
    const response = yield call(() => {return updateUserAPI(updatedUser[0])})
    if(response.data === "Ok"){
      yield put(updateUsersAC(dataAction.payload.newUserList))
    }     
  }
  catch(error){
    yield put(authErrorAC(error.response.data))
  }
}
 
export function* watchUpdateUsersSaga() {
  yield takeEvery(UPDATE_USER_SAGA, updateUsersSaga)
}
 
 
 
 
 
 
import { takeEvery, put, call } from "redux-saga/effects"
import {authorizationAPI} from "../../api/api"
import {
   GET_PARTICIPANTS, GET_USERS, AUTHORIZATION_S_ADMIN, AUTHORIZATION_SAGA,
   AUTHORIZATION_ADMIN, LOGOUT, AUTH_ERROR
 } from "../actionTypes/typesUsers"

//======================= AC =======================
//======================= Get user list ==============
const getUsersAC = (payload) => {
   return ({
     type: GET_USERS,
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
 
 
 //============================== Sagas ==============================
 
 //======================= Authorization =======================
 function* authorizationSaga(dataAction) {
   try {
     const response = yield call(() => {return authorizationAPI(dataAction.payload)})
     console.log("Saga: ", response.data)
     if(response.data.dataUser.role === "super_admin"){
       yield put(authorizationSadminAC())
       yield put(getUsersAC(response.data.userList))
       yield put(getParticipantsAC(response.data.participantList))
     } else {
       yield put(authorizationAdminAC(response.data.dataUser.fName)) 
     }
     
   }
   catch(error){
     yield put(authErrorAC(error.response.data))
   }
 }
 
 export function* watchAuthorizationSaga() {
   yield takeEvery(AUTHORIZATION_SAGA, authorizationSaga)
 }
 
 
 
 
 
 
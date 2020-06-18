import { takeEvery, put, call } from "redux-saga/effects"
import {getListOfCountriesAPI, setParticipantAPI} from "../../api/api"
import {
   SET_CURRENT_PAGE, GET_LIST_OF_COUNTRUES, GET_LIST_OF_COUNTRUES_SAGA,
   SET_PARTICIPANT_SAGA, SERVER_CHECK_ERROR
   } from "../actionTypes/typesParticipants"


//======================= AC =======================
export const setCurrentPageFormAC = (payload) => {
   console.log("payload", payload)
   return ({
     type: SET_CURRENT_PAGE,
     payload
   })
 }
 
const getListOfCountriesAC = (payload) => {
   return ({
     type: GET_LIST_OF_COUNTRUES,
     payload 
   })
 }
 
const serverCheckErrorAC = (payload) => {
   return ({
     type: SERVER_CHECK_ERROR,
     payload
   })
 }
 
export const getListOfCountries_SAGA = () => {
   return ({type: GET_LIST_OF_COUNTRUES_SAGA})
 }
 
export const setParticipant_SAGA = (payload) => {
   return ({
     type: SET_PARTICIPANT_SAGA,
     payload
   })
 }
 
 
 
 //============================== Sagas ==============================
 //======================= Get List Of Countries =======================
 function* getListOfCountriesSaga() {
   try {
     const response = yield call(() => {return getListOfCountriesAPI()})
     yield put(getListOfCountriesAC(response.data))
   }
   catch(e){console.log(e, "failure")}
 }
 
 export function* watchGetListOfCountriesSaga() {
   yield takeEvery(GET_LIST_OF_COUNTRUES_SAGA, getListOfCountriesSaga)
 }
 
 //======================= Set Participant =======================
 function* setParticipantSaga(dataAction) {
   try {
     const response = yield call(() => {return setParticipantAPI(dataAction.payload)})
     yield put(setCurrentPageFormAC(3))
    }
   catch(error){
     yield put(serverCheckErrorAC(error.response.data))
     yield put(setCurrentPageFormAC(3))
   }
 }
 
 export function* watchSetParticipantSaga() {
   yield takeEvery(SET_PARTICIPANT_SAGA, setParticipantSaga)
 }
 
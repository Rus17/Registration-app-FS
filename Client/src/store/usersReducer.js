// import { takeEvery, put, call } from "redux-saga/effects"
// import {getListOfCountriesAPI} from "../api/api"

const GET_PARTICIPANTS = "GET_PARTICIPANTS"
// const SET_PARTICIPANT = "SET_PARTICIPANT"
// const GET_LIST_OF_COUNTRUES = "GET_LIST_OF_COUNTRUES"
// const GET_LIST_OF_COUNTRUES_SAGA = "GET_LIST_OF_COUNTRUES_SAGA"

let initialState = {
  participantsList: [],
  usersList: [],
  isAuth: "true",
  sAdmin: true
}


const usersReducer = (state = initialState, action) => {
  
  switch (action.type){
    
    case GET_PARTICIPANTS: {
      return {
        ...state,
//        participantsList: [...action.participantsList]  
      }
    }
//      
//    case GET_LIST_OF_COUNTRUES: {
//      return {
//        ...state,
//        listOfCountries: [...action.payload]  
//      }
//    }
//      
//    case SET_PARTICIPANT: {
//    return {
//      ...state,
//      participantsList: [...state.participantsList, {...action.payload}]
//    }
//  }
//
    default: return state
  }
}

//======================= AC =======================

//export const getParticipantsAC = (participantsList) => {
//  return ({
//    type: GET_PARTICIPANTS,
//    participantsList: participantsList    
//  })
//}
//
//export const setParticipantAC = (payload) => {
//  return ({
//    type: SET_PARTICIPANT,
//    payload 
//  })
//}
//
//const getListOfCountriesAC = (payload) => {
//  return ({
//    type: GET_LIST_OF_COUNTRUES,
//    payload 
//  })
//}
//
//export const getListOfCountries_SAGA = () => {
//  return ({type: GET_LIST_OF_COUNTRUES_SAGA})
//}
//
//
//
////============================== Sagas ==============================
////======================= Get List Of Countries =======================
//function* getListOfCountriesSaga() {
//   try {
//      const response = yield call(() => {return getListOfCountriesAPI()})
//      yield put(getListOfCountriesAC(response.data))
//    }
//   catch(e){
//     console.log(e, "failure")
//   }
//}
//
//export function* watchGetProductListSaga() {
//   yield takeEvery(GET_LIST_OF_COUNTRUES_SAGA, getListOfCountriesSaga)
//}
//
//
export default usersReducer
import { takeEvery, put, call } from "redux-saga/effects"
import {getListOfCountriesAPI, setParticipantAPI} from "../api/api"

const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const GET_LIST_OF_COUNTRUES = "GET_LIST_OF_COUNTRUES"
const GET_LIST_OF_COUNTRUES_SAGA = "GET_LIST_OF_COUNTRUES_SAGA"
const SET_PARTICIPANT_SAGA = "SET_PARTICIPANT_SAGA"
const SERVER_CHECK_ERROR = "SERVER_CHECK_ERROR"


let initialState = {
  listOfCountries: [],
  currentPageForm: 1,
  serverCheckError: {}
}

const participantsReducer = (state = initialState, action) => {
  
  switch (action.type){
      
    case GET_LIST_OF_COUNTRUES: {
      return {
        ...state,
        listOfCountries: [...action.payload]  
      }
    }
      
    case SET_CURRENT_PAGE: {
    return {
      ...state,
      currentPageForm: action.payload
    }
  }
  
    case SERVER_CHECK_ERROR: {
    return {
      ...state,
      serverCheckError: action.payload
    }
  }
      
      
      
    default: return state
  }
}

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
//    console.log("resp", response.data)
    yield put(setCurrentPageFormAC(3))
   }
  catch(error){
//    console.log("resp catch", error.response.data)
    yield put(serverCheckErrorAC(error.response.data))
    yield put(setCurrentPageFormAC(3))
  }
}

export function* watchSetParticipantSaga() {
  yield takeEvery(SET_PARTICIPANT_SAGA, setParticipantSaga)
}


export default participantsReducer
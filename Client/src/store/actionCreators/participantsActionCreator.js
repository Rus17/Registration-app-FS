import { takeEvery, put, call } from "redux-saga/effects"
import { participants } from "../../api/api"
import {
  GET_PARTICIPANTS, GET_PARTICIPANTS_SAGA, CLEAR_PARTICIPANT_PAGE, SET_FILTRATION_PARTICIPANTS, SET_SEARCH_PARTICIPANTS, SET_PRELOADER,
  SET_STATUS_PARTICIPANT_SAGA, SET_STATUS_PARTICIPANT, SET_TOTAL_PARTICIPANTS_COUNT, SET_SORTING_PARTICIPANTS, SET_CURRENT_PAGE_PARTICIPANTS
} from "../actionTypes/participantsTypes"


//======================= AC =======================
//======================= Set participants list ==============
const setParticipantsAC = (payload) => {
  return ({ type: GET_PARTICIPANTS, payload })
}

//======================= Set total participants count ==============
const setTotalParticipantsCountAC = (payload) => {
  return ({ type: SET_TOTAL_PARTICIPANTS_COUNT, payload })
}

//================= set Status Participant ===================
export const setStatusParticipantAC = (payload) => {
  return ({ type: SET_STATUS_PARTICIPANT, payload })
}

//================= set Sorting Participants ===================
export const setSortingParticipantsAC = (payload) => {
  return ({ type: SET_SORTING_PARTICIPANTS, payload })
}

//================= set Current Page Participants ===================
export const setCurrentPageParticipantsAC = (payload) => {
  return ({ type: SET_CURRENT_PAGE_PARTICIPANTS, payload })
}

//================= set Filtration Participants ===================
export const setFiltrationParticipantsAC = (payload) => {
  return ({ type: SET_FILTRATION_PARTICIPANTS, payload })
}

//================= set Filtration Participants ===================
export const setSearchParticipantsAC = (payload) => {
  return ({ type: SET_SEARCH_PARTICIPANTS, payload })
}

//================ Clear ParticipantPage =============== 
export const clearParticipantPageAC = () => {
  return ({ type: CLEAR_PARTICIPANT_PAGE })
}

//================ Set preloader =============== 
export const setPreloaderAC = (payload) => {
  return ({ type: SET_PRELOADER, payload })
}


//======================= SC =======================
export const getParticipantsSC = (payload) => {
  return ({ type: GET_PARTICIPANTS_SAGA, payload })
}

//================= set Status Participant ===================
export const setStatusParticipantSC = (payload) => {
  return ({ type: SET_STATUS_PARTICIPANT_SAGA, payload })
}


//============================== Sagas ==============================
//======================= Get Participants =======================
function* getParticipantsSaga(dataAction) {
  try {
    yield put(setPreloaderAC(true))
    const response = yield call(() => {
      return participants.getParticipantsAPI(dataAction.payload)
    })
    if (response.statusText === "OK") {
      // yield put(setCurrentPageParticipantsAC(1))
      yield put(setParticipantsAC(response.data.participants))
      yield put(setTotalParticipantsCountAC(response.data.totalParticipantsCount))
    }
    yield put(setPreloaderAC(false))
  }
  catch (error) {
    console.log("error", error)
  }
}

export function* watchGetParticipantsSaga(payload) {
  yield takeEvery(GET_PARTICIPANTS_SAGA, getParticipantsSaga)
}


//================== Set Status Participant =====================
function* setStatusParticipantSaga(dataAction) {
  try {
    // yield put(setStatusParticipantAC(dataAction.payload))
    yield put(setPreloaderAC(true))
    const response = yield call(() => {
      return participants.setStatusParticipantAPI(dataAction.payload)
    })
    if (response.statusText === "OK") {
      yield put(setStatusParticipantAC(dataAction.payload))
    }
    yield put(setPreloaderAC(false))
  }
  catch (error) {
    console.log("error: ", error)
    yield put(setPreloaderAC(false))
  }
}

export function* watchSetStatusParticipantSaga() {
  yield takeEvery(SET_STATUS_PARTICIPANT_SAGA, setStatusParticipantSaga)
}

import { takeEvery, put, call } from "redux-saga/effects"
import { conference } from "../../api/api"
import {
  SET_CURRENT_PAGE, GET_LIST_OF_COUNTRUES, GET_LIST_OF_COUNTRUES_SAGA,
  SET_PARTICIPANT_SAGA, SERVER_CHECK_ERROR, PRELOADER
} from "../actionTypes/conf_regTypes"


//======================= AC =======================
export const setCurrentPageFormAC = (payload) => {
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

const preloaderAC = (payload) => {
  return ({
    type: PRELOADER,
    payload
  })
}



//======================= SC =======================
export const getListOfCountries_SC = () => {
  return ({ type: GET_LIST_OF_COUNTRUES_SAGA })
}

export const setParticipant_SC = (payload) => {
  return ({
    type: SET_PARTICIPANT_SAGA,
    payload
  })
}

//============================== Sagas ==============================
//======================= Get List Of Countries =======================
function* getListOfCountriesSaga() {
  try {
    const response = yield call(() => { return conference.getListOfCountriesAPI() })
    yield put(getListOfCountriesAC(response.data))
  }
  catch (e) { console.log(e, "failure") }
}

export function* watchGetListOfCountriesSaga() {
  yield takeEvery(GET_LIST_OF_COUNTRUES_SAGA, getListOfCountriesSaga)
}

//======================= Set Participant =======================
function* setParticipantSaga(dataAction) {
  try {
    yield put(preloaderAC(true))
    yield put(serverCheckErrorAC({}))
    const response = yield call(() => { return conference.setParticipantAPI(dataAction.payload) })
    if (response.statusText === "OK") {
      yield put(preloaderAC(false))
      yield put(setCurrentPageFormAC(3))
    }
  }
  catch (error) {
    yield put(preloaderAC(false))
    yield put(serverCheckErrorAC(error.response.data))
    yield put(setCurrentPageFormAC(3))
  }
}

export function* watchSetParticipantSaga() {
  yield takeEvery(SET_PARTICIPANT_SAGA, setParticipantSaga)
}

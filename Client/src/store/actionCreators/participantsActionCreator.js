import { takeEvery, put, call } from "redux-saga/effects"
import { participants } from "../../api/api"
import { GET_PARTICIPANTS, GET_PARTICIPANTS_SAGA, CLEAR_PARTICIPANT_PAGE } from "../actionTypes/participantsTypes"


//======================= AC =======================
//======================= Get participants list ==============
const getParticipantsAC = (payload) => {
  return ({
    type: GET_PARTICIPANTS,
    payload
  })
}

//======================= SC =======================
export const getParticipantsSC = () => {
  return ({ type: GET_PARTICIPANTS_SAGA })
}

//================ Clear ParticipantPage =============== 
export const clearParticipantPageAC = () => {
  return ({
    type: CLEAR_PARTICIPANT_PAGE
  })
}

//============================== Sagas ==============================
//======================= Get Participants =======================
function* getParticipantsSaga() {
  try {
    const response = yield call(() => {
      return participants.getParticipantsAPI()
    })
    if (response.statusText === "OK") {
      yield put(getParticipantsAC(response.data))
    }
  }
  catch (error) {
    console.log("error", error)
  }
}

export function* watchGetParticipantsSaga() {
  yield takeEvery(GET_PARTICIPANTS_SAGA, getParticipantsSaga)
}

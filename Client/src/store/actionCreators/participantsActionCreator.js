import { takeEvery, put, call } from "redux-saga/effects"
import { participants } from "../../api/api"
import { GET_PARTICIPANTS, GET_PARTICIPANTS_SAGA } from "../actionTypes/participantsTypes"


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

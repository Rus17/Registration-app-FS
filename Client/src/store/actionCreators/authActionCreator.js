import { takeEvery, put, call } from "redux-saga/effects"
import { auth } from "../../api/api"
import {
  AUTHORIZATION_SAGA, PRELOADER,
  AUTHORIZATION_ADMIN, LOGOUT, AUTH_ERROR
} from "../actionTypes/authTypes"

//======================= AC =======================
//======================= Set preloader ==============
const preloaderAC = (payload) => {
  return ({ type: PRELOADER, payload })
}

//======================= auth admin ===============
const authorizationAC = (payload) => {
  return ({ type: AUTHORIZATION_ADMIN, payload })
}

//======================= Logout ===============
export const logoutAC = () => {
  return ({ type: LOGOUT })
}

//================ Authorisation Error ===============
const authErrorAC = (payload) => {
  return ({ type: AUTH_ERROR, payload })
}

//===================== SC ====================== 

export const authorization_SAGA = (payload) => {
  return ({ type: AUTHORIZATION_SAGA, payload })
}

//============================ Sagas ============================
//======================= Authorization =========================
function* authorizationSaga(dataAction) {
  try {
    yield put(preloaderAC(true))
    const response = yield call(() => { return auth.authorizationAPI(dataAction.payload) })
    yield put(preloaderAC(false))
    yield put(authorizationAC(response.data))
    document.cookie = `token=${response.data.token}; max-age=1800; SameSite = Strict;`
    yield put(authErrorAC(""))
  }
  catch (error) {
    yield put(preloaderAC(false))
    console.log("error", error)
    yield put(authErrorAC(error.response.data))
  }
}

export function* watchAuthorizationSaga() {
  yield takeEvery(AUTHORIZATION_SAGA, authorizationSaga)
}


import { takeEvery, put, call } from "redux-saga/effects"
import { auth } from "../../api/api"
import {
  AUTHORIZATION_SAGA, FORBIDDEN,
  AUTHORIZATION_ADMIN, LOGOUT, AUTH_ERROR
} from "../actionTypes/authTypes"

//======================= AC =======================
// //======================= Set preloader ==============
// const preloaderAC = (payload) => {
//   return ({
//     type: PRELOADER,
//     payload
//   })
// }

// //======================= Set redirect ==============
// export const redirectAC = (payload) => {
//   return ({
//     type: REDIRECT,
//     payload
//   })
// }

//======================= auth super admin ===============
// const authorizationSadminAC = () => {
//   return ({
//     type: AUTHORIZATION_S_ADMIN
//   })
// }

//======================= auth admin ===============
const authorizationAC = (payload) => {
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

//================ Authorisation Error ===============
export const forbiddenAC = (payload) => {
  return ({
    type: FORBIDDEN,
    payload
  })
}


//===================== SC ====================== 

export const authorization_SAGA = (payload) => {
  return ({
    type: AUTHORIZATION_SAGA,
    payload
  })
}

//============================ Sagas ============================

//======================= Authorization =========================
function* authorizationSaga(dataAction) {
  try {
    const response = yield call(() => { return auth.authorizationAPI(dataAction.payload) })
    yield put(authorizationAC(response.data))
    // console.log("cookie: ", response.data.token)
    document.cookie = `token=${response.data.token}; max-age=1800; SameSite = Strict;`
  }
  catch (error) {
    console.log("error", error)
    yield put(authErrorAC(error.response.data))
  }
}

export function* watchAuthorizationSaga() {
  yield takeEvery(AUTHORIZATION_SAGA, authorizationSaga)
}








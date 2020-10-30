import { takeEvery, put, call } from "redux-saga/effects"
import { users } from "../../api/api"
import {
  USER_MODIFICATION, USER_MODIFICATION_SAGA, CLEAR_USER_PAGE,
  GET_USERS_SAGA, GET_USERS, UPDATE_USER_STATUS, UPDATE_USER_SAGA,
  DEL_USER_SAGA, ADD_USER, ADD_USER_SAGA, USER_ERROR, PRELOADER, REDIRECT, DEL_USER
} from "../actionTypes/typesUsers"
import { logoutAC } from "./authActionCreator"
import { clearParticipantPageAC } from "./participantsActionCreator"
//======================= AC =======================
//======================= Get user list ==============
const getUsersAC = (payload) => {
  return ({
    type: GET_USERS,
    payload
  })
}

//================ Modification user =============== 
const modificationUserAC = (payload) => {
  return ({
    type: USER_MODIFICATION,
    payload
  })
}

//================ Update user status=============== 
const updateUserStatusAC = (payload) => {
  return ({
    type: UPDATE_USER_STATUS,
    payload
  })
}

//================ Del user =============== 
const delUserAC = (payload) => {
  return ({
    type: DEL_USER,
    payload
  })
}

//======================= Set preloader ==============
const preloaderAC = (payload) => {
  return ({
    type: PRELOADER,
    payload
  })
}

//======================= Set redirect ==============
export const redirectAC = (payload) => {
  return ({
    type: REDIRECT,
    payload
  })
}

//================ Add user =============== 
const addUsersAC = (payload) => {
  return ({
    type: ADD_USER,
    payload
  })
}

//================ User error=============== 
export const userErrorAC = (payload) => {
  return ({
    type: USER_ERROR,
    payload
  })
}

//================ Clear UserPage =============== 
export const clearUserPageAC = () => {
  return ({
    type: CLEAR_USER_PAGE
  })
}



//===================== SC ====================== 

export const getUsers_SC = (payload) => {
  return ({
    type: GET_USERS_SAGA,
    payload
  })
}

export const updateUser_SC = (payload) => {
  return ({
    type: UPDATE_USER_SAGA,
    payload
  })
}

export const delUser_SC = (payload) => {
  return ({
    type: DEL_USER_SAGA,
    payload
  })
}

export const addUser_SC = (payload) => {
  return ({
    type: ADD_USER_SAGA,
    payload
  })
}

export const modifyUserSC = (payload) => {
  // console.log("mSC")
  return ({
    type: USER_MODIFICATION_SAGA,
    payload
  })
}


//============================ Sagas ============================ 
//========================== Get Users ==========================
function* getUsersSaga(dataAction) {
  try {
    const response = yield call(() => {
      return users.getUsersAPI()
    })
    if (response.statusText === "OK") {
      yield put(getUsersAC(response.data))
    }
  }
  catch (error) {
    yield put(userErrorAC(error.response.data))
  }
}

export function* watchGetUsersSaga() {
  yield takeEvery(GET_USERS_SAGA, getUsersSaga)
}

//======================= Modification User =======================
function* modificationUserSaga(dataAction) {
  try {
    const response = yield call(() => {
      return users.modificationUserAPI({
        modUser: dataAction.payload
      })
    })
    if (response.data === "OK") {
      // console.log("dataAction.auth dataAction.Email", dataAction.payload.auth, dataAction.payload.Email)
      if (dataAction.payload.Role === "super_admin" && dataAction.payload.auth !== dataAction.payload.Email) {
        yield put(logoutAC())
        yield put(clearUserPageAC())
        yield put(clearParticipantPageAC())
      } else {
        yield put(modificationUserAC(dataAction.payload))
      }



    }
  }
  catch (error) {
    yield put(userErrorAC(error.response.data))
  }
}

export function* watchModificationUserSaga() {
  yield takeEvery(USER_MODIFICATION_SAGA, modificationUserSaga)
}


//======================= Update User status =======================
function* updateUsersSaga(dataAction) {

  try {
    const response = yield call(() => {
      return users.updateUserAPI({
        id: dataAction.payload.id,
        status: dataAction.payload.newStatus
      })
    })
    if (response.data === "OK") {
      yield put(updateUserStatusAC(dataAction.payload))
    }
  }
  catch (error) {
    yield put(userErrorAC(error.response.data))
  }
}

export function* watchUpdateUsersSaga() {
  yield takeEvery(UPDATE_USER_SAGA, updateUsersSaga)
}

//======================= Del User =======================
function* delUserSaga(dataAction) {
  // console.log("dataAction", dataAction)
  try {
    const response = yield call(() => {
      return users.delUserAPI(dataAction.payload)
    })
    if (response.data === "OK") {
      yield put(delUserAC(dataAction.payload))
    }
  }
  catch (error) {
    yield put(userErrorAC(error.response.data))
  }
}

export function* watchDelUserSaga() {
  yield takeEvery(DEL_USER_SAGA, delUserSaga)
}


//======================= Add User =======================
function* addUserSaga(dataAction) {

  try {
    yield put(preloaderAC(true))
    const response = yield call(() => {
      return users.addUserAPI(dataAction.payload)
    })

    if (response.data.insertId) {
      dataAction = { ...dataAction.payload, UserID: response.data.insertId }
      yield put(preloaderAC(false))
      // yield put(redirectAC(true))
      yield put(addUsersAC(dataAction))
      yield put(userErrorAC({}))

      if (dataAction.Role === "super_admin") {
        yield put(logoutAC())
      }
    }
  }
  catch (error) {
    yield put(preloaderAC(false))
    yield put(userErrorAC(error.response.data))
  }
}

export function* watchAddUserSaga() {
  yield takeEvery(ADD_USER_SAGA, addUserSaga)
}






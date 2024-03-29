import { takeEvery, put, call } from "redux-saga/effects"
import { users } from "../../api/api"
import {
  USER_MODIFICATION, USER_MODIFICATION_SAGA, CLEAR_USER_PAGE,
  GET_USERS_SAGA, GET_USERS, UPDATE_USER_STATUS, UPDATE_USER_SAGA,
  USER_PERSONAL_PRELOADER, DEL_USER_SAGA, ADD_USER, ADD_USER_SAGA,
  USER_ERROR, USER_PAGE_PRELOADER, DEL_USER, SET_COMPONENT_MODE,
  FORBIDDEN
} from "../actionTypes/usersTypes"
import { logoutAC } from "./authActionCreator"
import { clearParticipantPageAC } from "./participantsActionCreator"


//======================= AC =======================
//======================= Get user list ==============
const getUsersAC = (payload) => {
  return ({ type: GET_USERS, payload })
}

//================ Modification user =============== 
const modificationUserAC = (payload) => {
  return ({ type: USER_MODIFICATION, payload })
}

//================ Update user status=============== 
const updateUserStatusAC = (payload) => {
  return ({ type: UPDATE_USER_STATUS, payload })
}

//================ Del user =============== 
const delUserAC = (payload) => {
  return ({ type: DEL_USER, payload })
}

//======================= Set preloader ==============
const preloaderAC = (payload) => {
  return ({ type: USER_PAGE_PRELOADER, payload })
}

//================ Add user =============== 
const addUsersAC = (payload) => {
  return ({ type: ADD_USER, payload })
}

//================ User error=============== 
export const userErrorAC = (payload) => {
  return ({ type: USER_ERROR, payload })
}

//================ Clear UserPage =============== 
export const clearUserPageAC = () => {
  return ({ type: CLEAR_USER_PAGE })
}

//================ Set component mode =============== 
export const setComponentModeAC = (payload) => {
  return ({ type: SET_COMPONENT_MODE, payload })
}

//================ Set user personel preloader =============== 
export const userPersonalPreloaderAC = (payload) => {
  console.log("AC", payload)
  return ({
    type: USER_PERSONAL_PRELOADER,
    userId: payload.userId,
    preloader: payload.preloader
  })
}

//================ ???? Error ===============
export const forbiddenAC = (payload) => {
  return ({ type: FORBIDDEN, payload })
}



//===================== SC ====================== 

export const getUsers_SC = (payload) => {
  return ({ type: GET_USERS_SAGA, payload })
}

export const updateUser_SC = (payload) => {
  return ({ type: UPDATE_USER_SAGA, payload })
}

export const delUser_SC = (payload) => {
  return ({ type: DEL_USER_SAGA, payload })
}

export const addUser_SC = (payload) => {
  return ({ type: ADD_USER_SAGA, payload })
}

export const modifyUserSC = (payload) => {
  return ({ type: USER_MODIFICATION_SAGA, payload })
}


//============================ Sagas ============================ 
//========================== Get Users ==========================
function* getUsersSaga() {
  yield put(preloaderAC(true))
  try {
    const response = yield call(() => {
      return users.getUsersAPI()
    })
    if (response.statusText === "OK") {
      yield put(preloaderAC(false))
      yield put(getUsersAC(response.data))
    }
  }
  catch (error) {
    yield put(preloaderAC(false))
    yield put(userErrorAC(error.response.data))
  }
}

export function* watchGetUsersSaga() {
  yield takeEvery(GET_USERS_SAGA, getUsersSaga)
}

//======================= Modification User =======================
function* modificationUserSaga(dataAction) {

  try {
    yield put(preloaderAC(true))
    const response = yield call(() => {
      return users.modificationUserAPI({
        modUser: dataAction.payload
      })
    })
    if (response.data === "OK") {
      yield put(preloaderAC(false))
      //Если я кого-то из админов сделал суперадмином
      if (dataAction.payload.admin_role === "super_admin" && dataAction.payload.auth !== dataAction.payload.email) {
        yield put(setComponentModeAC("showUsers"))
        yield put(clearUserPageAC())
        yield put(clearParticipantPageAC())
        yield put(logoutAC())
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
      } else {//Если я меняю свои или чьи-то данные, кроме повышения кого-то до суперадмина
        yield put(modificationUserAC(dataAction.payload))
        yield put(userErrorAC({}))
        yield put(setComponentModeAC("showUsers"))
      }
    }
  }
  catch (error) {
    yield put(preloaderAC(false))
    yield put(userErrorAC(error.response.data))
    yield put(setComponentModeAC("showUsers"))
  }
}

export function* watchModificationUserSaga() {
  yield takeEvery(USER_MODIFICATION_SAGA, modificationUserSaga)
}

//======================= Update User status =======================
function* updateUsersSaga(dataAction) {

  try {
    yield put(userPersonalPreloaderAC({ userId: dataAction.payload.id, preloader: true }))
    const response = yield call(() => {
      return users.updateUserAPI({
        id: dataAction.payload.id,
        status: dataAction.payload.newStatus
      })
    })
    yield put(userPersonalPreloaderAC({ userId: dataAction.payload.id, preloader: false }))
    if (response.data === "OK") {
      yield put(updateUserStatusAC(dataAction.payload))
    }
  }
  catch (error) {
    yield put(userPersonalPreloaderAC({ userId: dataAction.payload.id, preloader: false }))
    yield put(userErrorAC(error.response.data))
  }
}

export function* watchUpdateUsersSaga() {
  yield takeEvery(UPDATE_USER_SAGA, updateUsersSaga)
}

//======================= Del User =======================
function* delUserSaga(dataAction) {
  try {
    const response = yield call(() => {
      return users.delUserAPI(dataAction.payload)
    })
    if (response.data === "OK") {
      yield put(delUserAC(dataAction.payload))
    }
  }
  catch (error) {
    console.log("delUserSaga", error.response.data)
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
      dataAction = { ...dataAction.payload, userID: response.data.insertId }
      yield put(preloaderAC(false))
      delete dataAction.passwd
      yield put(addUsersAC(dataAction))
      yield put(userErrorAC({}))
      yield put(setComponentModeAC("showUsers"))

      if (dataAction.admin_role === "super_admin") {
        console.log("dataAction.userID", dataAction.userID)
        // yield put(delUserAC(dataAction.userID))
        yield put(clearUserPageAC())
        yield put(clearParticipantPageAC())
        yield put(logoutAC())
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
      }
    }
  }
  catch (error) {
    console.log("error1 :::", error)
    yield put(preloaderAC(false))
    yield put(userErrorAC(error.response.data))
    yield put(setComponentModeAC("showUsers"))
  }
}

export function* watchAddUserSaga() {
  yield takeEvery(ADD_USER_SAGA, addUserSaga)
}
 import { takeEvery, put, call } from "redux-saga/effects"
 import {authorizationAPI} from "../api/api"

//const GET_PARTICIPANTS = "GET_PARTICIPANTS"
const GET_USERS = "GET_USERS"
//const GET_USERS_SAGA = "GET_USERS_SAGA"
const AUTHORIZATION_S_ADMIN = "AUTHORIZATION_S_ADMIN"
const AUTHORIZATION_SAGA = "AUTHORIZATION_SAGA"
const AUTHORIZATION_ADMIN = "AUTHORIZATION_ADMIN"
const LOGOUT = "LOGOUT"
const AUTH_ERROR = "AUTH_ERROR"

let initialState = {
  participantsList: [],
  userList: [],
  isAuth: "",
  sAdmin: false,
  authError: ""
}


const usersReducer = (state = initialState, action) => {
  
  switch (action.type){
      
    case AUTHORIZATION_S_ADMIN: {
      return {
        ...state,
        sAdmin: true
      }
    }
      
    case AUTHORIZATION_ADMIN: {
      return {
        ...state,
        isAuth: action.payload
      }
    }      
      
//    case GET_PARTICIPANTS: {
//      return {
//        ...state,
////        participantsList: [...action.participantsList]  
//      }
//    }
    case GET_USERS: {
      return {
        ...state,
        userList: [...action.payload]  
      }
    }
      
    case LOGOUT: {
      return {
        ...state,
        isAuth: "",
        sAdmin: false
      }
    }
      
    case AUTH_ERROR: {
      return {
        ...state,
        authError: action.payload
      }
    }
      
    default: return state
  }
}

//======================= AC =======================
//======================= Get user list ==============
const getUsersAC = (payload) => {
  console.log("AC", payload)
  return ({
    type: GET_USERS,
    payload
  })
}
//======================= auth super admin ===============
const authorizationSadminAC = () => {
  return ({
    type: AUTHORIZATION_S_ADMIN
  })
}

//======================= auth admin ===============
const authorizationAdminAC = (payload) => {
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

//
//export const setParticipantAC = (payload) => {
//  return ({
//    type: SET_PARTICIPANT,
//    payload 
//  })
//}

//export const getUsers_SAGA = () => {
//  return ({type: GET_USERS_SAGA})
//}

export const authorization_SAGA = (payload) => {
  return ({
    type: AUTHORIZATION_SAGA,
    payload
  })
}


//============================== Sagas ==============================
//======================= Get Users List =======================
//function* getUsersListSaga() {
//  try {
//    const response = yield call(() => {return getUsersListAPI()})
//    yield put(getUsersAC(response.data))
//  }
//  catch(e){
//    console.log(e, "failure")
//  }
//}
//
//export function* watchGetUsersListSaga() {
//  yield takeEvery(GET_USERS_SAGA, getUsersListSaga)
//}

//======================= Authorization =======================
function* authorizationSaga(dataAction) {
  try {
    const response = yield call(() => {return authorizationAPI(dataAction.payload)})
    console.log("Saga: ", response.data)
    if(response.data.dataUser.role === "super_admin"){
      yield put(authorizationSadminAC())
      yield put(getUsersAC(response.data.userList))
    } else {
      yield put(authorizationAdminAC(response.data.dataUser.fName)) 
    }
    
  }
  catch(error){
    yield put(authErrorAC(error.response.data))
  }
}

export function* watchAuthorizationSaga() {
  yield takeEvery(AUTHORIZATION_SAGA, authorizationSaga)
}






export default usersReducer
import {
  GET_PARTICIPANTS, GET_USERS, AUTHORIZATION_S_ADMIN,
  AUTHORIZATION_ADMIN, LOGOUT, AUTH_ERROR
} from "../actionTypes/typesUsers"

let initialState = {
  participantList: [],
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
      
    case GET_PARTICIPANTS: {
      return {
        ...state,
        participantList: [...action.payload]  
      }
    }
      
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


export default usersReducer
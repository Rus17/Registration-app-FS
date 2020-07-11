import {
  GET_PARTICIPANTS, GET_USERS, AUTHORIZATION_S_ADMIN,
  AUTHORIZATION_ADMIN, LOGOUT, AUTH_ERROR, ADD_USER, USER_ERROR, PRELOADER, REDIRECT
} from "../actionTypes/typesUsers"

let initialState = {
  participantList: [],
  userList: [],
  isAuth: "",
  sAdmin: false,
  authError: "",
  userError: "",
  preloader: false,
  redirect: false
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
      
    case ADD_USER: {
      return {
        ...state,
        userList: [...state.userList, action.payload]  
      }
    }
    
    case USER_ERROR: {
      return {
        ...state,
        userError: action.payload 
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
      
    case PRELOADER: {
      return {
        ...state,
        preloader: action.payload
      }
    }
    case REDIRECT: {
      return {
        ...state,
        redirect: action.payload
      }
    }
      
    default: return state
  }
}


export default usersReducer
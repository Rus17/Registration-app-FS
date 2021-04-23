import {
  AUTHORIZATION_ADMIN, LOGOUT, AUTH_ERROR, PRELOADER, FORBIDDEN,
  REDIRECT
} from "../actionTypes/authTypes"

let initialState = {
  auth: {
    userID: "",
    role: "",
    name: "",
    email: ""
  },
  authError: "",
  preloader: false
}

const authReducer = (state = initialState, action) => {

  switch (action.type) {

    case AUTHORIZATION_ADMIN: {
      return {
        ...state,
        auth: { ...action.payload }
      }
    }

    case LOGOUT: {
      return {
        ...state,
        auth: {}
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

    // case REDIRECT: {
    //   return {
    //     ...state,
    //     redirect: action.payload
    //   }
    // }



    default: return state
  }
}


export default authReducer
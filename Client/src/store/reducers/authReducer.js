import {
  AUTHORIZATION_ADMIN, LOGOUT, AUTH_ERROR, PRELOADER,
  REDIRECT
} from "../actionTypes/authTypes"

let initialState = {
  // auth: {},
  auth: {
    role: "super_admin",
    name: "Rus",
    email: "rus@company.zp"
  },
  authError: "",
  preloader: false,
  redirect: false
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
        name: "",
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


export default authReducer
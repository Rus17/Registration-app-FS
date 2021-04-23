import {
  USER_MODIFICATION, CLEAR_USER_PAGE,
  GET_USERS, UPDATE_USER_STATUS, FORBIDDEN,
  ADD_USER, USER_ERROR, USER_PAGE_PRELOADER,
  DEL_USER, SET_COMPONENT_MODE, USER_PERSONAL_PRELOADER
} from "../actionTypes/usersTypes"

let initialState = {
  userList: [],
  userError: {},
  preloader: false,
  componentMode: 'showUsers',     // showUsers|addUser|editUser
  forbidden: false                //Open/close modal window
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_USERS: {
      return {
        ...state,
        userList: [...action.payload]
      }
    }

    case CLEAR_USER_PAGE: {
      return {
        ...state,
        userList: []
      }
    }

    case ADD_USER: {
      return {
        ...state,
        userList: [...state.userList, action.payload]
      }
    }

    case DEL_USER: {
      return {
        ...state,
        userList: state.userList.filter((user) => {
          return user.userID !== action.payload
        })
      }
    }

    case USER_MODIFICATION: {
      return {
        ...state,
        userList: state.userList.map((user) => {
          if (user.userID === action.payload.userID) {
            user = { ...action.payload }
          }
          return user
        })
      }
    }

    case UPDATE_USER_STATUS: {
      return {
        ...state,
        userList: state.userList.map((user) => {
          if (user.userID === action.payload.id) {
            user.status = action.payload.newStatus
          }
          return user
        })
      }
    }

    case USER_ERROR: {
      return {
        ...state,
        userError: action.payload
      }
    }

    case USER_PAGE_PRELOADER: {
      return {
        ...state,
        preloader: action.payload
      }
    }

    case SET_COMPONENT_MODE: {
      return {
        ...state,
        componentMode: action.payload
      }
    }

    case USER_PERSONAL_PRELOADER: {
      console.log("reducer", action)
      return {
        ...state,
        userList: state.userList.map((user) => {
          if (user.userID === action.userId) {
            user.userPersonalPreloader = action.preloader
          }
          return user
        })
      }
    }

    case FORBIDDEN: {
      return {
        ...state,
        forbidden: action.payload
      }
    }

    default: return state
  }
}


export default usersReducer
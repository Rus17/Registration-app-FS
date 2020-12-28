import {
  USER_MODIFICATION, CLEAR_USER_PAGE,
  GET_USERS, UPDATE_USER_STATUS,
  ADD_USER, USER_ERROR, PRELOADER,
  DEL_USER, SET_COMPONENT_MODE
} from "../actionTypes/typesUsers"

let initialState = {
  userList: [],
  userError: {},
  preloader: false,
  componentMode: 'showUsers'     // showUsers|addUser|editUser
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
          return user.UserID !== action.payload
        })
      }
    }

    case USER_MODIFICATION: {
      return {
        ...state,
        userList: state.userList.map((user) => {
          if (user.UserID === action.payload.UserID) {
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
          if (user.UserID === action.payload.id) {
            user.Status = action.payload.newStatus
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

    case PRELOADER: {
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

    default: return state
  }
}


export default usersReducer
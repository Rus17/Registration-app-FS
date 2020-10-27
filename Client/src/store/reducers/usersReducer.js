import {
  GET_PARTICIPANTS, GET_USERS, UPDATE_USER_STATUS,
  ADD_USER, USER_ERROR, PRELOADER,
  REDIRECT, DEL_USER
} from "../actionTypes/typesUsers"

let initialState = {
  participantList: [],
  userList: [],
  userError: {},
  preloader: false,
  redirect: false
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {

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

    case DEL_USER: {
      return {
        ...state,
        userList: state.userList.filter((user) => {
          return user.UserID !== action.payload
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
import {
  SET_CURRENT_PAGE, GET_LIST_OF_COUNTRUES, SERVER_CHECK_ERROR, PRELOADER
} from "../actionTypes/conf_regTypes"


let initialState = {
  listOfCountries: [],
  currentPageForm: 1,
  serverCheckError: {},
  preloader: false
}

const conf_regReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_LIST_OF_COUNTRUES: {
      return {
        ...state,
        listOfCountries: [...action.payload]
      }
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPageForm: action.payload
      }
    }

    case SERVER_CHECK_ERROR: {
      return {
        ...state,
        serverCheckError: action.payload
      }
    }

    case PRELOADER: {
      return {
        ...state,
        preloader: action.payload
      }
    }

    default: return state
  }
}


export default conf_regReducer

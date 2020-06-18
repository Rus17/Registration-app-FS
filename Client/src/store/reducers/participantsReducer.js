import {
SET_CURRENT_PAGE, GET_LIST_OF_COUNTRUES, SERVER_CHECK_ERROR
} from "../actionTypes/typesParticipants"


let initialState = {
  listOfCountries: [],
  currentPageForm: 1,
  serverCheckError: {}
}

const participantsReducer = (state = initialState, action) => {
  
  switch (action.type){
      
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
      
    default: return state
  }
}


export default participantsReducer
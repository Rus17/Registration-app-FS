import { GET_PARTICIPANTS, CLEAR_PARTICIPANT_PAGE } from "../actionTypes/participantsTypes"


let initialState = {
  participantList: [],
}

const participantsReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_PARTICIPANTS: {
      return {
        ...state,
        participantList: [...action.payload]
      }
    }

    case CLEAR_PARTICIPANT_PAGE: {
      return {
        ...state,
        participantList: []
      }
    }

    default: return state
  }
}


export default participantsReducer
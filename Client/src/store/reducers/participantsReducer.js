import { GET_PARTICIPANTS } from "../actionTypes/participantsTypes"


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

    default: return state
  }
}


export default participantsReducer
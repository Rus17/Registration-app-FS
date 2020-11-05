import {
  GET_PARTICIPANTS, CLEAR_PARTICIPANT_PAGE,
  SET_STATUS_PARTICIPANT, SET_TOTAL_PARTICIPANTS_COUNT
} from "../actionTypes/participantsTypes"


let initialState = {
  participantList: [],
  pageSize: 30,
  totalParticipantsCount: 0,
  currentPage: 1,
  sort: "UserID"
}

const participantsReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_PARTICIPANTS: {
      return {
        ...state,
        participantList: [...action.payload]
      }
    }

    case SET_TOTAL_PARTICIPANTS_COUNT: {
      return {
        ...state,
        totalParticipantsCount: action.payload
      }
    }

    case SET_STATUS_PARTICIPANT: {
      return {
        ...state,
        participantList: state.participantList.map((part) => {
          if (part.UserID === action.payload.id) {
            part.Status = action.payload.status
          }
          return part
        })
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
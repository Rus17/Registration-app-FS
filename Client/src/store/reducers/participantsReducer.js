import {
  GET_PARTICIPANTS, CLEAR_PARTICIPANT_PAGE, SET_FILTRATION_PARTICIPANTS, SET_SEARCH_PARTICIPANTS, SET_PRELOADER,
  SET_STATUS_PARTICIPANT, SET_TOTAL_PARTICIPANTS_COUNT, SET_SORTING_PARTICIPANTS, SET_CURRENT_PAGE_PARTICIPANTS
} from "../actionTypes/participantsTypes"


let initialState = {
  participantList: [],
  pageSize: 20,
  totalParticipantsCount: 0,
  currentPage: 1,
  sort: "UserID",
  filter: "All",
  search: {
    // fieldName: '',
    // searchText: ''
  },
  preloader: false
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

    case SET_SORTING_PARTICIPANTS: {
      return {
        ...state,
        sort: action.payload
      }
    }

    case SET_FILTRATION_PARTICIPANTS: {
      return {
        ...state,
        filter: action.payload
      }
    }

    case SET_SEARCH_PARTICIPANTS: {
      return {
        ...state,
        search: action.payload
      }
    }

    case SET_CURRENT_PAGE_PARTICIPANTS: {
      return {
        ...state,
        currentPage: action.payload
      }
    }

    case SET_STATUS_PARTICIPANT: {
      return {
        ...state,
        participantList: state.participantList.map((part) => {

          if (part.userID === action.payload.id) {
            part.status = action.payload.status
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

    case SET_PRELOADER: {
      return {
        ...state,
        preloader: action.payload
      }
    }




    default: return state
  }
}


export default participantsReducer
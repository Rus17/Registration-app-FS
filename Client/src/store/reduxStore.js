import {combineReducers, createStore, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import createSagaMiddleware from 'redux-saga'

import participantsReducer from "./reducers/participantsReducer"
import { watchGetListOfCountriesSaga, watchSetParticipantSaga 
} from "./actionCreators/actionCreatorsParticipants"

import usersReducer from "./reducers/usersReducer"
import { watchAuthorizationSaga } from "./actionCreators/actionCreatorsUsers"


let reducers = combineReducers({
  participantsPage: participantsReducer,
  usersPage: usersReducer,
  form: formReducer
})

const sagaMiddleware = createSagaMiddleware()

let store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(watchGetListOfCountriesSaga)
sagaMiddleware.run(watchSetParticipantSaga)
sagaMiddleware.run(watchAuthorizationSaga)

window.store = store
export default store
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import createSagaMiddleware from 'redux-saga'

import participantsReducer, { watchGetListOfCountriesSaga, watchSetParticipantSaga } from "./participantsReducer"
import usersReducer, { watchAuthorizationSaga } from "./usersReducer"

//import { watchGetListOfCountriesSaga, watchSetParticipantSaga } from './participantsReducer'
//import { watchAuthorizationSaga } from './usersReducer'



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
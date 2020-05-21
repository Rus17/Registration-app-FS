import {combineReducers, createStore, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form'
import createSagaMiddleware from 'redux-saga'

import participantsReducer from "./participantsReducer"
import usersReducer from "./usersReducer"
import { watchGetProductListSaga, watchSetParticipantSaga } from './participantsReducer'

let reducers = combineReducers({
  participantsPage: participantsReducer,
  usersPage: usersReducer,
  form: formReducer
})

const sagaMiddleware = createSagaMiddleware()

let store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(watchGetProductListSaga)
sagaMiddleware.run(watchSetParticipantSaga)

window.store = store
export default store
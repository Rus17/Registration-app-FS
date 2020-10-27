import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import createSagaMiddleware from 'redux-saga'

import authReducer from "./reducers/authReducer"
import {
  watchAuthorizationSaga
} from "./actionCreators/authActionCreator"

import usersReducer from "./reducers/usersReducer"
import {
  watchUpdateUsersSaga, watchGetUsersSaga,
  watchDelUserSaga, watchAddUserSaga
} from "./actionCreators/actionCreatorsUsers"


import participantsReducer from "./reducers/participantsReducer"
import {
  watchGetListOfCountriesSaga, watchSetParticipantSaga
} from "./actionCreators/actionCreatorsParticipants"




let reducers = combineReducers({
  participantsPage: participantsReducer,
  usersPage: usersReducer,
  authPage: authReducer,
  form: formReducer
})

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(watchGetListOfCountriesSaga)
sagaMiddleware.run(watchSetParticipantSaga)
sagaMiddleware.run(watchAuthorizationSaga)
sagaMiddleware.run(watchGetUsersSaga)
sagaMiddleware.run(watchUpdateUsersSaga)
sagaMiddleware.run(watchDelUserSaga)
sagaMiddleware.run(watchAddUserSaga)

window.store = store
export default store

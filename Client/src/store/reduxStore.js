import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import createSagaMiddleware from 'redux-saga'

import authReducer from "./reducers/authReducer"
import { watchAuthorizationSaga } from "./actionCreators/authActionCreator"

import usersReducer from "./reducers/usersReducer"
import {
  watchUpdateUsersSaga, watchGetUsersSaga, watchModificationUserSaga,
  watchDelUserSaga, watchAddUserSaga
} from "./actionCreators/usersActionCreator"

import participantsReducer from "./reducers/participantsReducer"
import { watchGetParticipantsSaga, watchSetStatusParticipantSaga } from "./actionCreators/participantsActionCreator"

import conf_regReducer from "./reducers/conf_regReducer"
import { watchGetListOfCountriesSaga, watchSetParticipantSaga } from "./actionCreators/conf_regActionCreators"


let reducers = combineReducers({
  conf_regPage: conf_regReducer,
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
sagaMiddleware.run(watchGetParticipantsSaga)
sagaMiddleware.run(watchModificationUserSaga)
sagaMiddleware.run(watchAuthorizationSaga)
sagaMiddleware.run(watchGetUsersSaga)
sagaMiddleware.run(watchUpdateUsersSaga)
sagaMiddleware.run(watchDelUserSaga)
sagaMiddleware.run(watchAddUserSaga)
sagaMiddleware.run(watchSetStatusParticipantSaga)

window.store = store
export default store

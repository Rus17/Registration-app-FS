import React from 'react'
import { Route } from "react-router-dom"
import './App.scss'
import RegistrationFormContainer from "./components/RegistrationForm/RegistrationFormContainer"
import AdminLoginFormContainer from "./components/AdminPanel/AdminLoginForm/AdminLoginFormContainer"
import ParticipantsPageContainer from "./components/AdminPanel/ParticipantsPage/ParticipantsPageContainer"
import UsersPageContainer from "./components/AdminPanel/UsersPage/UsersPageContainer"
import StartPageContainer from './components/StartPage/StartPageContainer'

function App() {
  return (
    <div className="container">
      <Route exact path="/" component={StartPageContainer} />
      <Route exact path="/registration" component={RegistrationFormContainer} />
      <Route exact path="/admin" component={AdminLoginFormContainer} />
      <Route exact path="/admin/participants" component={ParticipantsPageContainer} />
      <Route exact path="/admin/users" component={UsersPageContainer} />
    </div>
  )
}

export default App;

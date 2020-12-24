import React from 'react'
import { Route } from "react-router-dom"
import './App.scss'
import RegistrationFormContainer from "./components/RegistrationForm/RegistrationFormContainer"

import AdminLoginFormContainer from "./components/AdminPanel/AdminLoginForm/AdminLoginFormContainer"
//import AdminPanelContainer from "./components/AdminPanel/AdminPanelContainer"
import ParticipantsPageContainer from "./components/AdminPanel/ParticipantsPage/ParticipantsPageContainer"
import UsersPageContainer from "./components/AdminPanel/UsersPage/UsersPageContainer"
// import UserAddFormContainer from "./components/AdminPanel/UserAddForm/UserAddFormContainer"

function App() {
  return (
    <div className="container">

      <Route exact path="/" component={RegistrationFormContainer} />
      <Route exact path="/admin" component={AdminLoginFormContainer} />

      <Route exact path="/admin/participants" component={ParticipantsPageContainer} />
      <Route exact path="/admin/users" component={UsersPageContainer} />
      {/* <Route exact path="/admin/users/add_user" component={UserAddFormContainer} /> */}
    </div>
  );
}

export default App;

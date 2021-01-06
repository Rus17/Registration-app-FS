import { reduxForm } from 'redux-form'
import React from "react"
import Page1Container from "./Page1/Page1Container"
import Page2Container from "./Page2/Page2Container"
import Page3Container from "./Page3/Page3Container"
import s from "./RegistrationForm.module.scss"

const RegistrationForm = ({ handleSubmit, onSubmit, nextPageHandler, prevPageHandler, currentPageForm }) => {
  return (
    <>
      <form action="" onSubmit={handleSubmit} className={s.registrationForm}>

        {currentPageForm === 1 &&
          <Page1Container nextPageHandler={nextPageHandler} />}

        {currentPageForm === 2 &&
          <Page2Container prevPageHandler={prevPageHandler} />}

        {currentPageForm === 3 && <Page3Container prevPageHandler={prevPageHandler} />}

      </form>
    </>
  )
}

const ReduxRegistrationForm = reduxForm({ form: 'registration' })(RegistrationForm)

export default ReduxRegistrationForm
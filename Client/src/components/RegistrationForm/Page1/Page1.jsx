import React from "react"
import { Field } from 'redux-form'
import { required, minInput, email, alphabetic } from '../../../utils/validators'
import { Input, Email } from '../../formsControl/formsControl'
import s from "../RegistrationForm.module.scss"

const Page1 = ({ currentPageForm, firstPageHandler, formIsValid }) => {
  return (
    <>
      <div className={s.titleForm}>
        Registration for IT conference <br />
        Step {currentPageForm}
      </div>

      <div className={s.formGrid}>
        <label>First Name</label>
        <Field
          name="first_name"
          placeholder="First Name"
          type="text"
          component={Input}
          validate={[required, minInput, alphabetic]}
        />
        <label>Last Name</label>
        <Field
          name="last_name"
          placeholder="Last Name"
          type="text"
          component={Input}
          validate={[required, minInput, alphabetic]}
        />
        <label>Email</label>
        <Field
          name="email"
          placeholder="Email"
          component={Email}
          validate={[required, email]}
          type="email"
        />
      </div>

      <div className={s.buttonContainer}>
        <div></div>
        <button onClick={firstPageHandler.bind(null, formIsValid)} className={s.buttonForm}>Next</button>
      </div>

    </>
  )
}

export default Page1
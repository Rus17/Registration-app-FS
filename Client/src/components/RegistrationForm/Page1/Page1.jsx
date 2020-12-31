import React from "react"
import { Field } from 'redux-form'
import { required, minInput, email, alphabetic } from '../../../validators/validators'
import { Input, Email } from '../../formsControl/formsControl'
import s from "../RegistrationForm.module.scss"

const Page1 = ({ nextPageHandler, currentPageForm, firstPageHandler }) => {
  return (
    <>
      <div className={s.titleForm}>Step {currentPageForm}</div>
      <label>First Name</label>
      <Field
        name="fName"
        placeholder="First Name"
        type="text"
        component={Input}
        validate={[required, minInput, alphabetic]}
      />
      <label>Last Name</label>
      <Field
        name="lName"
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
      <button type="submit" onClick={firstPageHandler} className={s.buttonForm}>Next</button>
    </>
  )
}

export default Page1
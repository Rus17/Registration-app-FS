import React from "react"
import {Field} from 'redux-form'
import {required, minInput, email, alphabetic} from '../../../validators/validators'
import {Input, Email} from '../../formsControl/formsControl'

const Page1 = (props) => {
  return (
    <>
      <div className="titleForm">Step {props.currentPageForm}</div>
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
      <button onClick={props.nextPageHandler} className="buttonForm">Next</button>
    </>
  )
}

export default Page1
import React from "react"
import {Field} from 'redux-form'

const Page1 = (props) => {
  return (
    <>
      <div className="titleForm">Step {props.currentPageForm}</div>
      <label>First Name</label>
      <Field name="fName" required placeholder="First Name" component="input" type="text"/>
      <label>Last Name</label>
      <Field name="lName" placeholder="Last Name" component="input" type="text"/>
      <label>Email</label>
      <Field name="email" placeholder="Email" component="input" type="email"/>
      <button onClick={props.nextPageHandler} className="buttonForm">Next</button>
    </>
  )
}

export default Page1
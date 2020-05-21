import React from "react"
import {reduxForm, Field} from 'redux-form'
import "./adminLoginForm.css"

const AdminLoginForm = (props) => {
  return(<>
    <form action="" onSubmit={props.handleSubmit} className="adminLoginForm">        
      <div className="titleForm">Login to admin panel</div>
      <div className="label">
        <label>Email</label>
      </div>
      <div>
        <Field className="field" name="fName" placeholder=" " component="input" type="email"/>
      </div>
      <div className="label">
        <label>Password</label>
      </div>
      <div>
        <Field className="field" name="lName" placeholder=" " component="input" type="text"/>
      </div>
            
      <button type="submit" className="buttonAdmForm">Login</button>
      </form>
  </>)
}
    
const ReduxAdminLoginForm = reduxForm ({form: 'adminLogin'})(AdminLoginForm)

export default ReduxAdminLoginForm
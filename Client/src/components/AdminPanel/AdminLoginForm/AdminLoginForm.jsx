import React from "react"
import { reduxForm, Field } from 'redux-form'
import "./adminLoginForm.css"

const AdminLoginForm = ({ handleSubmit, authError }) => {
  //  console.log("props", props)
  return (<>
    <form action="" onSubmit={handleSubmit} className="adminLoginForm">
      <div className="titleForm">Login to admin panel <br /> rus@company.zp</div>
      {authError && <div className="error"> {authError}</div>}

      <div className="label">
        <label>Email</label>
      </div>
      <div>
        <Field className="field" name="email" placeholder=" " component="input" type="email" />
      </div>
      <div className="label">
        <label>Password</label>
      </div>
      <div>
        <Field className="field" name="passwd" placeholder=" " component="input" type="text" />
      </div>

      <button type="submit" className="buttonAdmForm">Login</button>
    </form>
  </>)
}

const ReduxAdminLoginForm = reduxForm({ form: 'adminLogin' })(AdminLoginForm)

export default ReduxAdminLoginForm
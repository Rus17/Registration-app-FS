import React from "react"
import { reduxForm, Field } from 'redux-form'
import s from "./AdminLoginForm.module.scss"

const AdminLoginForm = ({ handleSubmit, authError }) => {
  console.log("props", authError)
  return (<>
    <form action="" onSubmit={handleSubmit} className={s.adminLoginForm}>
      <div className={s.titleForm}>Login to admin panel <br /> rus@company.zp</div>
      {authError && <div className="error"> {authError}</div>}

      <div className={s.label}>
        <label>Email</label>
      </div>
      <div>
        <Field className={s.field} name="email" placeholder=" " component="input" type="email" />
      </div>
      <div className={s.label}>
        <label>Password</label>
      </div>
      <div>
        <Field className={s.field} name="passwd" placeholder=" " component="input" type="password" />
      </div>

      <button type="submit" className={s.buttonAdmForm}>Login</button>
    </form>
  </>)
}

const ReduxAdminLoginForm = reduxForm({ form: 'adminLogin' })(AdminLoginForm)

export default ReduxAdminLoginForm
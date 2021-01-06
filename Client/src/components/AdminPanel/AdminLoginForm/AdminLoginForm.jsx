import React from "react"
import { reduxForm, Field } from 'redux-form'
import { required, minInput, email } from '../../../utils/validators'
import { Input, Email } from '../../formsControl/formsControl'
import s from "./AdminLoginForm.module.scss"

const AdminLoginForm = ({ handleSubmit, authError }) => {
  return (<>
    <form action="" onSubmit={handleSubmit} className={s.adminLoginForm}>
      <div className={s.titleForm}>Login to admin panel</div>
      {authError && <div className={s.authError}> {authError}</div>}

      <div className={s.label}>
        <label>Email</label>
      </div>
      <div>
        <Field
          className={s.field}
          name="email"
          placeholder=" "
          component={Email}
          type="email"
          validate={[required, minInput, email]}
        />
      </div>
      <div className={s.label}>
        <label>Password</label>
      </div>
      <div>
        <Field
          className={s.field}
          name="passwd"
          placeholder=" "
          component={Input}
          type="password"
          validate={[required, minInput]}
        />
      </div>

      <button type="submit" className={s.buttonAdmForm}>Login</button>
    </form>
  </>)
}

const ReduxAdminLoginForm = reduxForm({ form: 'adminLogin' })(AdminLoginForm)

export default ReduxAdminLoginForm
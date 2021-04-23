import React from "react"
import { Field, reduxForm } from 'redux-form'
import { required, minInput, email, alphabetic, requiredRadio } from '../../../utils/validators'
import { Input, Email, Radio } from '../../formsControl/formsControl'
import s from "./UserAddForm.module.scss"
import spinner from "../../../Img/spinner3.svg"

const UserAddForm = ({ handleSubmit, preloader, userError, msg, mod, initialValues, componentModeHandler }) => {
  return (
    <div className={s.userAddFormPage}>
      <form onSubmit={handleSubmit} className={s.userAddForm}>
        <div className={s.titleForm}>
          {mod === "addUser" && 'Adding a new user to the database'}
          {mod === "editUser" && `Editing user ${initialValues.email}`}
        </div>
        {mod === "addUser" && <label> Email</label>}
        {mod === "addUser" && < Field
          name="email"
          component={Email}
          type="email"
          placeholder="Email"
          validate={[required, minInput, email]}
        />}

        <label>Password</label>
        {mod === "addUser"
          ? <Field
            name="passwd"
            component={Input}
            type="password"
            placeholder="Password"
            validate={[required, minInput]}
          />
          : <Field
            name="passwd"
            component={Input}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
        }

        <label>First Name</label>
        <Field
          name="first_name"
          component={Input}
          type="text"
          placeholder="First Name"
          validate={[required, minInput, alphabetic]}
        />

        <label>Last Name</label>
        <Field
          name="last_name"
          component={Input}
          type="text"
          placeholder="Last Name"
          validate={[required, minInput, alphabetic]}
        />


        <label>Role</label>
        <div>
          <div className={s.sadmin}>
            <Field
              name="admin_role"
              component={Radio}
              type="radio"
              value="super_admin"
              validate={[requiredRadio]}
              label="Super administrator"
            />
          </div>
          <div>
            <Field
              name="admin_role"
              component={Radio}
              type="radio"
              value="admin"
              validate={[requiredRadio]}
              label="Administrator"
            />
          </div>
        </div>
        {msg ? <label className={s.attention}>Attention!</label> : null}
        {msg ? <div className={s.attention}> The current super administrator account will be deleted.</div> : null}


        <label>Status</label>
        <div>
          <div>
            <Field
              name="status"
              component={Radio}
              type="radio"
              value="active"
              validate={[requiredRadio]}
              label="Active"
            />
          </div>
          <div>
            <Field
              name="status"
              component={Radio}
              type="radio"
              value="blocked"
              validate={[requiredRadio]}
              label="Blocked"
            />
          </div>
        </div>

        {userError && <>
          <div></div><div className={s.userError}>
            {userError.first_name} <br />
            {userError.last_name} <br />
            {userError.email} <br />
            {userError.passwd} <br />
            {userError.admin_role} <br />
            {userError.status}
          </div>
        </>}

        <div className={s.link} onClick={componentModeHandler.bind(null, 'showUsers')}>&#8592; Back</div>
        {preloader
          ? <img src={spinner} height="10" alt="" />
          : mod === "addUser"
            ? <button type="submit">Add user</button>
            : <button type="submit">Save</button>
        }

      </form>
    </div >
  )
}

const ReduxUserAddForm = reduxForm({ form: 'addUser' })(UserAddForm)


export default ReduxUserAddForm
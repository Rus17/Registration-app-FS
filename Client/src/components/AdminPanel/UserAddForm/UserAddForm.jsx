import React from "react"
import { Field, reduxForm } from 'redux-form'
import { required, minInput, email, alphabetic, requiredRadio } from '../../../validators/validators'
import { Input, Email, Radio } from '../../formsControl/formsControl'
import s from "./UserAddForm.module.scss"
import spinner from "../../../Img/spinner.svg"

const UserAddForm = ({ handleSubmit, preloader, userError, msg, mod, initialValues, componentModeHandler }) => {
  return (
    <div className={s.userAddFormPage}>
      <form onSubmit={handleSubmit} className={s.userAddForm}>
        <div className={s.titleForm}>
          {mod === "add" && 'Adding a new user to the database'}
          {mod === "edit" && `Editing user ${initialValues.Email}`}
        </div>
        {mod === "add" && <label> Email</label>}
        {mod === "add" && < Field
          name="Email"
          component={Email}
          type="email"
          placeholder="Email"
          validate={[required, minInput, email]}
        />}

        <label>Password</label>
        <Field
          name="Passwd"
          component={Input}
          type="text"
          placeholder="Password"
          validate={[required, minInput]}
        />

        <label>First Name</label>
        <Field
          name="First_Name"
          component={Input}
          type="text"
          placeholder="First Name"
          validate={[required, minInput, alphabetic]}
        />

        <label>Last Name</label>
        <Field
          name="Last_Name"
          component={Input}
          type="text"
          placeholder="Last Name"
          validate={[required, minInput, alphabetic]}
        />


        <label>Role</label>
        <div>
          <div className={s.sa}>
            <Field
              name="Role"
              component={Radio}
              type="radio"
              value="super_admin"
              validate={[requiredRadio]}
            />{' '}Super administrator
          </div>
          <div>
            <Field
              name="Role"
              component={Radio}
              type="radio"
              value="admin"
              validate={[requiredRadio]}
            />{' '}Administrator
          </div>
        </div>
        {msg ? <label className={s.attention}>Attention!</label> : null}
        {msg ? <div className={s.attention}> The current super administrator account will be deleted.</div> : null}


        <label>Status</label>
        <div>
          <div>
            <Field
              name="Status"
              component={Radio}
              type="radio"
              value="active"
              validate={[requiredRadio]}
            />{' '}Active
          </div>
          <div>
            <Field
              name="Status"
              component={Radio}
              type="radio"
              value="blocked"
              validate={[requiredRadio]}
            />{' '}Blocked
          </div>
        </div>
        {userError && <>
          <div></div><div className={s.userError}>
            {userError.First_Name} <br />
            {userError.Last_Name} <br />
            {userError.Email} <br />
            {userError.Passwd} <br />
            {userError.Role} <br />
            {userError.Status}
          </div>
        </>}

        <div className={s.link} onClick={componentModeHandler.bind(null, 'showUsers')}>&#8592; Back</div>
        {preloader
          ? <img src={spinner} width="40" height="40" alt="" />
          : mod === "add"
            ? <button type="submit">Add user</button>
            : <button type="submit">Save</button>
        }

      </form>
    </div >
  )
}

const ReduxUserAddForm = reduxForm({ form: 'addUser' })(UserAddForm)


export default ReduxUserAddForm
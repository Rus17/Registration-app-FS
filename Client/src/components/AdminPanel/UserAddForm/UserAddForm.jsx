import React from "react"
import { Field, reduxForm } from 'redux-form'
import {required, minInput, email, alphabetic, requiredRadio} from '../../../validators/validators'
import {Input, Email, Radio} from '../../formsControl/formsControl'
import s from "./UserAddForm.module.css"
import spinner from "../../../Img/2.svg"

const UserAddForm = ({handleSubmit, preloader, userError}) => {
  return (<div className={s.userAddFormPage}>
    <form onSubmit={handleSubmit}  className={s.userAddForm}>
      <div className={s.titleForm}>Adding a new user to the database</div>
      <label>
        Email
      </label>
      <Field
        name="Email"
        component={Email}
        type="email"
        placeholder="Email"
        validate={[required, minInput, email]}
      />
      
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

      <label></label>
      {preloader
      ? <img src={spinner} width="40" height="40" alt="" />
      : <button type="submit">Add user</button>}      
    
    </form>
  </div>)
}

const ReduxUserAddForm = reduxForm ({form: 'addUser'})(UserAddForm)


export default ReduxUserAddForm
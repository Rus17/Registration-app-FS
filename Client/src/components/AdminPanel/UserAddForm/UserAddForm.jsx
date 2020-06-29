import React from "react"
import { Field, reduxForm } from 'redux-form'
import {required, minInput, email, alphabetic} from '../../../validators/validators'
import {Input, Email} from '../../formsControl/formsControl'
import s from "./UserAddForm.module.css"

const UserAddForm = ({handleSubmit}) => {
  return (<>
    <form onSubmit={handleSubmit} className={s.userAddForm}>
      
      <label>
        Email
      </label>
      <Field
        name="Email"
        component={Input}
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
        <label className={s.sa}>
          <Field 
            name="Role" 
            component="input" 
            type="radio" 
            value="sadmin"             
          />{' '}
          Super administrator
        </label>
        <label>
          <Field 
            name="Role" 
            component="input" 
            type="radio" 
            value="admin"
          />{' '}              
          Administrator
        </label>
      </div>
      
      <label>Status</label>
      <div>
        <label>
          <Field 
            name="Status" 
            component="input" 
            type="radio" 
            value="active"             
          />{' '}
          Active
        </label>
        <label>
          <Field 
            name="Status" 
            component="input" 
            type="radio" 
            value="blocked"            
          />{' '}              
          Blocked
        </label>
      </div>

      <label></label>
      <button type="submit">
        Add user
      </button>
    
    </form>
  </>)
}

const ReduxUserAddForm = reduxForm ({form: 'addUser'})(UserAddForm)


export default ReduxUserAddForm
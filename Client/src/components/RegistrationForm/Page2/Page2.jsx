import React from "react"
import {Field} from 'redux-form'
import {required, minInput, alphabetic} from '../../../validators/validators'
import {Input} from '../../formsControl/formsControl'

const Page2 = (props) => {
  
  const countriesPoints = props.listOfCountries.map((item, i) => {
    return <option key={i} value={item.name}>{item.name}</option>
  })
  
  
  return (
    <>
      <div className="titleForm">Step {props.currentPageForm}</div>
      <label>Arrival date</label>
      <Field name="arrivalDate" type="date" placeholder="Arrival date" component="input"/>
        
      <label>Departure date</label>
      <Field name="departureDate" type="date" placeholder="Departure date" component="input"/>
      
      <label>Company name</label>
      <Field 
        name="company" 
        placeholder="Company name"
        component={Input}
        validate={[required, minInput, alphabetic]} 
      />
      
      <label>Position in company</label>
      <Field 
        name="position" 
        placeholder="Position in company" 
        component={Input}
        validate={[required, minInput, alphabetic]}        
      />
      
      <label>Role</label>
      <div>
        <Field name="role" component="input" type="radio" value="listener" />{' '}
          Listener
      </div>
    
      <label></label>
      <div>
        <Field name="role" component="input" type="radio" value="speaker" />{' '}
          Speaker
      </div>  
      
      <label>Sex</label> 
      <div>
        <Field name="sex" component="input" type="radio" value="male" />{' '}
          Male
      </div>
      <label></label> 
      <div>
        <Field name="sex" component="input" type="radio" value="female" />{' '}
          Female
      </div>      
      
      <label>Birthdate</label>
      <Field name="birthdate" type="date" placeholder="Birthdate" component="input"/>
        
      <label>Country</label>
      <Field name="country"component="select">
        <option />
        {countriesPoints}
      </Field>
    
      <button onClick={props.prevPageHandler} className="buttonBack">Back</button>
    </>
  )
}

export default Page2
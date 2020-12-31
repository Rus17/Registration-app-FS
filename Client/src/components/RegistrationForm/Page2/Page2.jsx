import React from "react"
import { Field } from 'redux-form'
import { required, minInput, alphabetic } from '../../../validators/validators'
import { Input, Radio, InputDate } from '../../formsControl/formsControl'
import s from "../RegistrationForm.module.scss"

const Page2 = ({ prevPageHandler, currentPageForm, listOfCountries }) => {

  const countriesPoints = listOfCountries.map((item, i) => {
    return <option key={i} value={item.name}>{item.name}</option>
  })

  return (
    <>
      <div className={s.titleForm}>Step {currentPageForm}</div>
      <label>Arrival date</label>
      <Field
        name="arrivalDate"
        type="date"
        placeholder="Arrival date"
        component={InputDate}
        validate={[required]}
        className={s.inputDate}
      />

      <label>Departure date</label>
      <Field
        name="departureDate"
        type="date"
        placeholder="Departure date"
        component={InputDate}
        validate={[required]}
        className={s.inputDate}
      />

      <label>Company name</label>
      <Field
        name="company"
        placeholder="Company name"
        component={Input}
        validate={[required, minInput, alphabetic]}
        className={s.input}
      />

      <label>Position in company</label>
      <Field
        name="position"
        placeholder="Position in company"
        component={Input}
        validate={[required, minInput, alphabetic]}
        className={s.input}
      />

      <label>Role</label>
      <div>
        <Field
          name="role"
          component={Radio}
          type="radio"
          value="listener"
          validate={[required]}
        />{' '}
          Listener
      </div>

      <label></label>
      <div>
        <Field
          name="role"
          component={Radio}
          type="radio"
          value="speaker"
          validate={[required]}
        />{' '}
          Speaker
      </div>

      <label>Sex</label>
      <div>
        <Field
          name="sex"
          component={Radio}
          type="radio"
          value="male"
          validate={[required]}
        />{' '}
          Male
      </div>
      <label></label>
      <div>
        <Field
          name="sex"
          component={Radio}
          type="radio"
          value="female"
          validate={[required]}
        />{' '}
          Female
      </div>

      <label>Birthdate</label>
      <Field
        name="birthdate"
        type="date"
        placeholder="Birthdate"
        component={InputDate}
        validate={[required]}
        className={s.inputDate}
      />

      <label>Country</label>
      <Field name="country" component="select" className={s.select} >
        <option hidden value="0" >Select</option>
        {/* <option /> */}
        {countriesPoints}
      </Field>

      <button onClick={prevPageHandler} className={s.buttonBack}>Back</button>
    </>
  )
}

export default Page2
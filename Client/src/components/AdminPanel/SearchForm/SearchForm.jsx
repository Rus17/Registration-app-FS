import React, { useEffect } from "react"
import { Field, reduxForm } from 'redux-form'
import { required } from '../../../validators/validators'
// import { Input } from '../../formsControl/formsControl'
import s from './SearchForm.module.css'

const SearchForm = ({ handleSubmit }) => {

  return <>
    <form onSubmit={handleSubmit} className={s.search}>
      <Field
        name="Search"
        component="input"
        type="text"
        placeholder="Search"
        validate={[required]}
      />
    </form>
  </>
}

const ReduxSearchForm = reduxForm({ form: 'Search' })(SearchForm)

export default ReduxSearchForm
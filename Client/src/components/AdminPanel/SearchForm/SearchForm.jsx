import React from "react"
import { Field, reduxForm } from 'redux-form'
import { required } from '../../../validators/validators'
import s from './SearchForm.module.scss'

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
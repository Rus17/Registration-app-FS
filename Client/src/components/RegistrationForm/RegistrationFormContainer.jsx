import React, { useEffect } from 'react'
import RegistrationForm from "./RegistrationForm"
import { useDispatch, useSelector } from 'react-redux'
import {
  setParticipant_SC, getListOfCountries_SC, setCurrentPageFormAC
} from "../../store/actionCreators/conf_regActionCreators"

const RegistrationFormContainer = () => {

  const dispatch = useDispatch()
  const currentPageForm = useSelector(state => state.conf_regPage.currentPageForm)

  const nextPageHandler = () => {
    dispatch(setCurrentPageFormAC(currentPageForm + 1))
  }

  const prevPageHandler = () => {
    dispatch(setCurrentPageFormAC(currentPageForm - 1))
  }

  useEffect(() => { dispatch(getListOfCountries_SC()) }, [])

  const onSubmit = (formData) => {
    dispatch(setParticipant_SC(formData))
  }

  return (
    <>
      <RegistrationForm
        onSubmit={onSubmit}
        nextPageHandler={nextPageHandler}
        prevPageHandler={prevPageHandler}
        currentPageForm={currentPageForm}
        initialValues={{ formName: 'conf' }}
      />
    </>
  )
}

export default RegistrationFormContainer
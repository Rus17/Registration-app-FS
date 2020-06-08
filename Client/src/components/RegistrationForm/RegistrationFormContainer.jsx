import React, {useEffect} from 'react'
import RegistrationForm from "./RegistrationForm"
import { useDispatch, useSelector } from 'react-redux'
import {setParticipant_SAGA, getListOfCountries_SAGA, setCurrentPageFormAC} from "../../store/participantsReducer"

const RegistrationFormContainer = (props) => {
  
  const dispatch = useDispatch()  
  const currentPageForm = useSelector(state => state.participantsPage.currentPageForm)
  
  const nextPageHandler = () => {
    dispatch(setCurrentPageFormAC(currentPageForm + 1))
  }
  
  const prevPageHandler = () => {
    dispatch(setCurrentPageFormAC(currentPageForm - 1))
  }
  
  useEffect(() => {dispatch(getListOfCountries_SAGA())}, [])
  
  const onSubmit = (formData) => {
    dispatch(setParticipant_SAGA(formData))
  }

  return(
    <>
      <RegistrationForm 
        onSubmit={onSubmit}
        nextPageHandler={nextPageHandler}
        prevPageHandler={prevPageHandler}
        currentPageForm={currentPageForm}
      />
    </>
  )
}

export default RegistrationFormContainer
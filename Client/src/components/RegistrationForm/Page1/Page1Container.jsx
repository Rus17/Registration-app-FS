import React from "react"
import Page1 from "./Page1"
import { useSelector } from 'react-redux'

const Page1Container = ({ nextPageHandler, formIsValid }) => {

  const currentPageForm = useSelector(state => state.conf_regPage.currentPageForm)

  const firstPageHandler = (formIsValid) => {
    if (formIsValid) {
      nextPageHandler()
    }
  }

  return (
    <Page1
      currentPageForm={currentPageForm}
      firstPageHandler={firstPageHandler}
      formIsValid={formIsValid}
    />
  )
}

export default Page1Container
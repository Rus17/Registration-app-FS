import React from "react"
import Page1 from "./Page1"
import { useSelector } from 'react-redux'

const Page1Container = ({ nextPageHandler }) => {

  const currentPageForm = useSelector(state => state.conf_regPage.currentPageForm)
  const currentValueFirstPage = useSelector(state => state.form.registration)

  const firstPageHandler = (e) => {
    if (currentValueFirstPage.values
      && currentValueFirstPage.values.first_name
      && currentValueFirstPage.values.last_name
      && currentValueFirstPage.values.email
    ) {
      e.preventDefault()
      nextPageHandler()
    }
  }

  return <>
    <Page1
      currentPageForm={currentPageForm}
      firstPageHandler={firstPageHandler}
    />
  </>
}

export default Page1Container
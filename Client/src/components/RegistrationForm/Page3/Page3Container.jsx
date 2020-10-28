import React from "react"
import Page3 from "./Page3"
import { useSelector } from 'react-redux'

const Page3Container = ({ prevPageHandler }) => {
  const registrationData = useSelector(state => state.form.registration.values)
  const currentPageForm = useSelector(state => state.conf_regPage.currentPageForm)
  const serverCheckError = useSelector(state => state.conf_regPage.serverCheckError)

  return <>
    <Page3
      registrationData={registrationData}
      currentPageForm={currentPageForm}
      serverCheckError={serverCheckError}
      prevPageHandler={prevPageHandler}
    />
  </>
}

export default Page3Container
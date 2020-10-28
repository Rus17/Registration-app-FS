import React from "react"
import { useSelector } from 'react-redux'

import Page2 from "./Page2"

const Page2Container = ({ prevPageHandler }) => {

  const listOfCountries = useSelector(state => state.conf_regPage.listOfCountries)
  const currentPageForm = useSelector(state => state.conf_regPage.currentPageForm)

  return <>
    <Page2
      prevPageHandler={prevPageHandler}
      currentPageForm={currentPageForm}
      listOfCountries={listOfCountries}
    />
  </>
}

export default Page2Container
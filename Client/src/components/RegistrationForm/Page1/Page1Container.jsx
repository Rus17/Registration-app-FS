import React from "react"
import Page1 from "./Page1"
import { useSelector } from 'react-redux'

const Page1Container = ({ nextPageHandler }) => {

  const currentPageForm = useSelector(state => state.conf_regPage.currentPageForm)

  return <>
    <Page1 nextPageHandler={nextPageHandler}
      currentPageForm={currentPageForm} />
  </>
}

export default Page1Container
import React from "react"
import Page1 from "./Page1"
import { useSelector } from 'react-redux'

const Page1Container = (props) => {
  
  const currentPageForm = useSelector(state => state.participantsPage.currentPageForm)
  
  return <>
    <Page1 nextPageHandler={props.nextPageHandler}
            currentPageForm={currentPageForm}/>
  </>
}

export default Page1Container
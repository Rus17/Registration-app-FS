import React from "react"
import { useSelector } from 'react-redux'

import Page2 from "./Page2"

const Page2Container = (props) => {
  
  const listOfCountries = useSelector(state => state.participantsPage.listOfCountries)
  const currentPageForm = useSelector(state => state.participantsPage.currentPageForm)
  
  
  return <>    
    <Page2 
          prevPageHandler={props.prevPageHandler}
          currentPageForm={currentPageForm}
          listOfCountries={listOfCountries}        
    />
  </>
}

export default Page2Container
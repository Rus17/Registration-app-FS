import React from "react"
import { useSelector } from 'react-redux'

import Page2 from "./Page2"

const Page2Container = (props) => {
  
  const listOfCountries = useSelector(state => state.participantsPage.listOfCountries)
  
  return <>    
    <Page2 
          prevPageHandler={props.prevPageHandler}
          pageNumber={props.pageNumber}
          listOfCountries={listOfCountries}            
    />
  </>
}

export default Page2Container
import {reduxForm} from 'redux-form'
import React from "react"
import Page1Container from "./Page1/Page1Container"
import Page2Container from "./Page2/Page2Container"
import Page3Container from "./Page3/Page3Container"
import "./registrationForm.css"

const RegistrationForm = (props) => {
  return (
    <>
      <form action="" onSubmit={props.handleSubmit} className="registrationForm"> 
        
        {props.currentPageForm === 1 && 
          <Page1Container 
            nextPageHandler={props.nextPageHandler}
          />}
          
          {props.currentPageForm === 2 && 
          <Page2Container 
            prevPageHandler={props.prevPageHandler}
          />}
          {props.currentPageForm === 2 && <button type="submit" className="buttonForm">Finish</button>}
          
          {props.currentPageForm === 3 && <Page3Container />}
          
      </form>
    </>
  )
}

const ReduxRegistrationForm = reduxForm ({form: 'registration'})(RegistrationForm)

export default ReduxRegistrationForm
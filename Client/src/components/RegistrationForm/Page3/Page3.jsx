import React from "react"
//import {Field} from 'redux-form'

const Page3 = ({registrationData, currentPageForm, serverCheckError, prevPageHandler}) => {
  
//  console.log("serverCheckError", serverCheckError)
  
  if(Object.keys(serverCheckError).length > 0){
    return(
    <>
      <div className="titleForm">Error</div>
      <div className="lastMessage">
        {serverCheckError.fName && <div className="error">{serverCheckError.fName}</div>}
        {serverCheckError.lName && <div className="error">{serverCheckError.lName}</div>}
        {serverCheckError.arrivalDate && <div className="error">{serverCheckError.arrivalDate}</div>}
        {serverCheckError.departureDate && <div className="error">{serverCheckError.departureDate}</div>}
        {serverCheckError.company && <div className="error">{serverCheckError.company}</div>}
        {serverCheckError.position && <div className="error">{serverCheckError.position}</div>}
        {serverCheckError.sex && <div className="error">{serverCheckError.sex}</div>}
        {serverCheckError.birthdate && <div className="error">{serverCheckError.birthdate}</div>}
        {serverCheckError.email && <div className="error">{serverCheckError.email}</div>}
        {serverCheckError.role && <div className="error">{serverCheckError.role}</div>}
        {serverCheckError.country && <div className="error">{serverCheckError.country}</div>}
 
      </div>
      <button onClick={prevPageHandler} className="buttonBack">Back</button>
    </>
    )
  }
  else {
    return (
      <>
        <div className="titleForm">Step {currentPageForm}</div>
        <div className="lastMessage">
          {registrationData.fName} {registrationData.lName}, your registration has been completed successfully. A confirmation email was sent to {registrationData.email}. We will notify you by email when your registration is confirmed. 
        </div>

      </>
    )
  }
}

export default Page3
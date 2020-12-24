import React from "react"
import s from "../RegistrationForm.module.scss"

const Page3 = ({ registrationData, currentPageForm, serverCheckError, prevPageHandler }) => {

  if (Object.keys(serverCheckError).length > 0) {
    return (
      <>
        <div className={s.titleForm}>Error</div>
        <div className={s.lastMessage}>
          {serverCheckError.fName && <div className={s.error}>{serverCheckError.fName}</div>}
          {serverCheckError.lName && <div className={s.error}>{serverCheckError.lName}</div>}
          {serverCheckError.arrivalDate && <div className={s.error}>{serverCheckError.arrivalDate}</div>}
          {serverCheckError.departureDate && <div className={s.error}>{serverCheckError.departureDate}</div>}
          {serverCheckError.company && <div className={s.error}>{serverCheckError.company}</div>}
          {serverCheckError.position && <div className={s.error}>{serverCheckError.position}</div>}
          {serverCheckError.sex && <div className={s.error}>{serverCheckError.sex}</div>}
          {serverCheckError.birthdate && <div className={s.error}>{serverCheckError.birthdate}</div>}
          {serverCheckError.email && <div className={s.error}>{serverCheckError.email}</div>}
          {serverCheckError.role && <div className={s.error}>{serverCheckError.role}</div>}
          {serverCheckError.country && <div className={s.error}>{serverCheckError.country}</div>}

        </div>
        <button onClick={prevPageHandler} className={s.buttonBack}>Back</button>
      </>
    )
  }
  else {
    return (
      <>
        <div className={s.titleForm}>Step {currentPageForm}</div>
        <div className={s.lastMessage}>
          {registrationData.fName} {registrationData.lName}, your registration has been completed successfully. A confirmation email was sent to {registrationData.email}. We will notify you by email when your registration is confirmed.
        </div>
      </>
    )
  }
}

export default Page3
import React from "react"
import { useSelector } from 'react-redux'
import Page2 from "./Page2"

import spinner from "../../../Img/spinner.svg"
import s from "../RegistrationForm.module.scss"

const Page2Container = ({ prevPageHandler }) => {

  const listOfCountries = useSelector(state => state.conf_regPage.listOfCountries)
  const currentPageForm = useSelector(state => state.conf_regPage.currentPageForm)
  const preloader = useSelector(state => state.conf_regPage.preloader)

  return <>
    {preloader
      ? <img className={s.spinner} src={spinner} width="60" height="60" alt="" />
      : <Page2
        prevPageHandler={prevPageHandler}
        currentPageForm={currentPageForm}
        listOfCountries={listOfCountries}
      />
    }
  </>
}

export default Page2Container
import React from 'react'
import StartPage from './StartPage'
import { conference } from '../../config'

const StartPageContainer = () => {
  return <StartPage city={conference.city} theme={conference.theme} />
}

export default StartPageContainer
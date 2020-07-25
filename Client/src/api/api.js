import * as axios from "axios"

const instance = axios.create({
  baseURL: 'http://localhost:4000/admin',
  headers: {'Content-Type': 'application/json'}
})

export const conference = {
  getListOfCountriesAPI() {
    return axios.get(`https://restcountries.eu/rest/v2/all`)
  },
  
  setParticipantAPI(payload) {
    return axios.post(`http://localhost:4000/conf_registration`, 
      JSON.stringify(payload), 
      {headers: {'content-type': 'application/json'}}
    )
  }
}

export const users = {
  authorizationAPI(payload) {
    return instance.post('', JSON.stringify(payload))
  },

  updateUserAPI(payload) {  
    return instance.put('/users', JSON.stringify(payload))
  },

  delUserAPI(payload) {
    return instance.delete(`/users/${payload}`, payload)
  },

  addUserAPI (payload) {  
    return instance.post('/users', JSON.stringify(payload))
  }
}


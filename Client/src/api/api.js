import * as axios from "axios"
import { getCookie } from "../utils/getCookies"

const instance = axios.create({
  baseURL: 'http://localhost:4000/admin',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `${getCookie("token")}`
  }
})

console.log("api token", getCookie("token"))


export const conference = {
  getListOfCountriesAPI() {
    return axios.get(`https://restcountries.eu/rest/v2/all`)
  },

  setParticipantAPI(payload) {
    return axios.post(`http://localhost:4000/registration`,
      JSON.stringify(payload),
      { headers: { 'content-type': 'application/json' } }
    )
  }
}

export const auth = {
  authorizationAPI(payload) {
    return instance.post('/auth', JSON.stringify(payload))
  }
}

export const users = {
  getUsersAPI() {
    return instance.get('/users', {
      headers: {
        'Authorization': `${getCookie("token")}`
      }
    })
  },

  modificationUserAPI(payload) {
    return instance.put(`/users/${payload.modUser.userID}`, JSON.stringify(payload.modUser), {
      headers: {
        'Authorization': `${getCookie("token")}`
      }
    })
  },

  updateUserAPI(payload) {
    // console.log("api", payload)
    return instance.patch(`/users/${payload.id}`, JSON.stringify({ status: payload.status }), {
      headers: {
        'Authorization': `${getCookie("token")}`
      }
    })
  },

  delUserAPI(payload) {
    // console.log("api", payload)
    return instance.delete(`/users/${payload}`, {
      headers: {
        'Authorization': `${getCookie("token")}`
      }
    })
  },

  addUserAPI(payload) {
    return instance.post('/users', JSON.stringify(payload), {
      headers: {
        'Authorization': `${getCookie("token")}`
      }
    })
  }
}

export const participants = {

  getParticipantsAPI(payload) {
    // console.log("api", payload)
    // console.log("payload.search.fieldName", payload.search.fieldName)
    // console.log("payload.search.searchText", payload.search.searchText)

    return instance.get(
      `/participants/${payload.sort}/${payload.pageSize}/${payload.currentPage}/${payload.filter}/${payload.search.fieldName}/${payload.search.searchText}`
    )
  },

  setStatusParticipantAPI(payload) {
    // console.log("api", payload)
    return instance.patch(`/participants/${payload.id}`, JSON.stringify({ status: payload.status }))
  }
}


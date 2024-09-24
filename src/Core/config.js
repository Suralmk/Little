import axios from 'axios'

import useGlobal from './global'

const token = JSON.parse(localStorage.getItem('tokens'))
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
})

export const googleapi = axios.create({
  baseURL: 'http://127.0.0.1:8000/'
})

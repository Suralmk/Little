import axios from 'axios'

import useGlobal from './global'

const token = JSON.parse(localStorage.getItem('tokens'))
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

export const api = axios.create({
  baseURL: 'https://littleapi.pythonanywhere.com/api/'
})

export const googleapi = axios.create({
  baseURL: 'https://littleapi.pythonanywhere.com/'
})

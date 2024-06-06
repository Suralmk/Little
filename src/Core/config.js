import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

export const api = axios.create({
  baseURL: 'https://dashboardsurafel.pythonanywhere.com/api/'
})

import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'
import { api } from './config'

const useGlobal = create(set => ({
  authed: () => {
    set(state => ({
      authenticated: false
    }))
  },
  loading: false,
  setLoading: val => {
    set(state => ({
      loading: val
    }))
  },
  //Toast
  toasts: [],
  addToast: (message, type = 'info') => {
    set(state => ({
      toasts: [...state.toasts, { id: Date.now(), message, type }]
    }))
  },
  removeToast: id => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id)
    }))
  },
  // Auth
  authenticated: !!localStorage.getItem('tokens'),
  user: localStorage.getItem('tokens')
    ? jwtDecode(localStorage.getItem('tokens'))
    : null,
  tokens: localStorage.getItem('tokens')
    ? localStorage.getItem('tokens')
    : null,
  init: async () => {
    const tokens = localStorage.getItem('tokens')
    if (tokens) {
      try {
        const res = await api.post('/token/refresh/', {
          refresh: JSON.parse(tokens).refresh
        })
        console.log(res)
        let data = {
          access: res.data.access,
          refresh: JSON.parse(tokens).refresh
        }
        localStorage.setItem('tokens', JSON.stringify(data))

        set(state => ({
          authenticated: true,
          user: jwtDecode(res.data.access)
        }))
      } catch (err) {
        console.log(err.message)
      }
    }
  },

  login: data => {
    localStorage.setItem('tokens', JSON.stringify(data))
    set(state => ({
      authenticated: true,
      user: jwtDecode(data.access)
    }))
  },

  logout: () => {
    localStorage.removeItem('tokens')
    set(state => ({
      authenticated: false,
      user: null
    }))
  }
}))

export default useGlobal

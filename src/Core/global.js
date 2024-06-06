import { create } from 'zustand'
import { api } from './config'
import utils from './utils'
import { jwtDecode } from 'jwt-decode'
import { jsondata } from '../Constants/jsondata'

const useGlobal = create(set => ({
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

  init: async () => {
    const tokens = localStorage.getItem('tokens')
    if (tokens) {
      set(state => ({
        authenticated: true,
        user: jwtDecode(tokens)
      }))
    }
  },

  // Authentication

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

import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'

const useGlobal = create(set => ({
  authed: () => {
    set(state => ({
      authenticated: false
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
  tokens: localStorage.getItem('tokens'),
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

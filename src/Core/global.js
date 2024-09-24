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
        localStorage.setItem('tokens', JSON.stringify(res.data))
        set(state => ({
          authenticated: true,
          user: jwtDecode(res.data.access),
          tokens: res.data
        }))
      } catch (err) {
        console.log(err)
      }
    }
  },

  login: data => {
    localStorage.setItem('tokens', JSON.stringify(data))
    set(state => ({
      authenticated: true,
      user: jwtDecode(data.access),
      tokens: data
    }))
  },

  logout: () => {
    localStorage.removeItem('tokens')
    set(state => ({
      authenticated: false,
      user: null
    }))
  },
  updateProfile: updatedProfile => {
    set(state => ({
      user: {
        ...state.user,
        profile: {
          ...state.user.profile,
          ...updatedProfile
        }
      }
    }))
  },

  //Check Connection
  // get Current Profile

  fetchProfile: async (username, token_access) => {
    try {
      const res = await api.get(`/${username}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token_access}`
        }
      })
      return res.data
    } catch (err) {
      console.log(err.response.data)
    }
  }
}))

export default useGlobal

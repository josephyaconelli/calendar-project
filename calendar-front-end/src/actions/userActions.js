import * as types from './actionTypes'

export const logIn = (email, password) => ({
  type: types.LOG_IN,
  payload: {
    email,
    password
  }
})

export const logInSuccess = (email, authToken, refreshToken) => ({
  type: types.LOG_IN_SUCCESS,
  payload: {
    email,
    authToken,
    refreshToken
  }
})

export const logInFailure = (error) => ({
  type: types.LOG_IN_FAILURE,
  payload: {
    error
  }
})

export const logOut = () => ({
  type: types.LOG_OUT
})

export const refresh = () => ({
  type: types.REFRESH
})

export const refreshSuccess = (token) => ({
  type: types.REFRESH_SUCCESS,
  payload: {
    token
  }
})

export const refreshFailure = (error) => ({
  type: types.REFRESH_FAILURE,
  payload: {
    error
  }
})
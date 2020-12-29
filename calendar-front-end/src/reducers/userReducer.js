import initialState from './initialState'
import * as types from '../actions/actionTypes'

const userReducer = (state = initialState.user, action) => {
  let newState
  const { payload } = action
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      newState = action.payload
      return newState
    case types.LOG_OUT:
      newState = {}
      return newState
    case types.LOG_IN_FAILURE:
      newState = { error: payload.error }
      return newState
    case types.REFRESH_SUCCESS:
      newState = { ...state, authToken: payload.token }
      return newState
    case types.REFRESH_FAILURE:
      newState = { error: payload.error }
      return newState
    default:
      return state
  }

}

export default userReducer
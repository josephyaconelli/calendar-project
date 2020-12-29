import initialState from './initialState'
import * as types from '../actions/actionTypes'

const eventsReducer = (state = initialState.events, action) => {
  let newState
  const { payload } = action
  switch (action.type) {
    case types.GET_EVENTS_SUCCESS:
    case types.SEARCH_EVENTS_SUCCESS:
      newState = action.payload.events
      return newState
    case types.ADD_EVENT_SUCCESS:
      const events = Array.isArray(state) ? state : Array.isArray(state.events) ? state.events : null
      newState = {events, eventAdded: true}
      return newState
    case types.EDIT_EVENT_SUCCESS:
      const idx = state.findIndex(({_id}) => _id === payload.id)
      newState = [...state]
      newState[idx] = {...newState[idx], ...payload.updated}
      return newState
    case types.REMOVE_EVENT_SUCCESS:
      newState = state.filter(({_id}) => _id !== payload.id)
      return newState
    case types.GET_EVENTS_FAILURE:
    case types.ADD_EVENT_FAILURE:
    case types.EDIT_EVENT_FAILURE:
    case types.SEARCH_EVENTS_FAILURE:
    case types.REMOVE_EVENT_FAILURE:
      newState = { error: payload.error }
      return newState
    default:
      return state
  }

}

export default eventsReducer
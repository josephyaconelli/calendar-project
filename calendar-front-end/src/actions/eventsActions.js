import * as types from './actionTypes'

export const getEventsByMonth = (month, year) => ({
  type: types.GET_EVENTS_BY_MONTH,
  payload: {
    month,
    year
  }
})

export const getEventsSuccess = (events) => ({
  type: types.GET_EVENTS_SUCCESS,
  payload: {
    events
  }
})

export const getEventsFailure = (error) => ({
  type: types.GET_EVENTS_FAILURE,
  payload: {
    error
  }
})

export const addEvent = (
    title,
    description,
    start,
    end,
    busy,
    shared
  ) => ({
  type: types.ADD_EVENT,
  payload: {
    title,
    description,
    start,
    end,
    busy,
    shared
  }
})

export const addEventSuccess = () => ({
  type: types.ADD_EVENT_SUCCESS,
})

export const addEventFailure = (error) => ({
  type: types.ADD_EVENT_FAILURE,
  payload: {
    error
  }
})

export const editEvent = (
    id,
    toUpdate
  ) => ({
  type: types.EDIT_EVENT,
  payload: {
    id,
    toUpdate
  }
})

export const editEventSuccess = (id, updated) => ({
  type: types.EDIT_EVENT_SUCCESS,
  payload: {
    id,
    updated
  }
})

export const editEventFailure = (error) => ({
  type: types.EDIT_EVENT_FAILURE,
  payload: {
    error
  }
})


export const searchEvents = (searchString) => ({
  type: types.SEARCH_EVENTS,
  payload: {
    searchString
  }
})

export const searchEventsSuccess = (events) => ({
  type: types.SEARCH_EVENTS_SUCCESS,
  payload: {
    events
  }
})

export const searchEventsFailure = (error) => ({
  type: types.SEARCH_EVENTS_FAILURE,
  payload: {
    error
  }
})

export const removeEvent = (id) => ({
  type: types.REMOVE_EVENT,
  payload: {
    id
  }
})

export const removeEventSuccess = (id) => ({
  type: types.REMOVE_EVENT_SUCCESS,
  payload: {
    id
  }
})

export const removeEventFailure = (error) => ({
  type: types.REMOVE_EVENT_FAILURE,
  payload: {
    error
  }
})
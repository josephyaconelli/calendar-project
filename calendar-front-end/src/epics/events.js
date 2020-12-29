import { combineEpics } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import axios from 'axios'
import { get } from 'lodash'
import * as types from '../actions/actionTypes'
import CONSTANTS from '../constants/constants'
import { getEventsSuccess, getEventsFailure, addEventSuccess, addEventFailure, editEventSuccess, editEventFailure, searchEventsSuccess, searchEventsFailure, removeEventSuccess, removeEventFailure } from '../actions/eventsActions'
import { refresh } from '../actions/userActions'

const getEventsByMonthEpic = (action$, state$) => action$.pipe(
  ofType(types.GET_EVENTS_BY_MONTH),
  mergeMap(({ payload }) => 
    {
      console.log('authoken: ', get(state$, 'value.user.authToken', ''))
      return axios.post(CONSTANTS.SERVER.GET_EVENTS_BY_MONTH, {
      month: payload.month,
      year: payload.year
    }, {
      headers: {
        "auth-token": get(state$, 'value.user.authToken', '')
      }
    })
    .then(res => getEventsSuccess(get(res, 'data.data.events', [])))
    .catch(error => {
      
      if (error.response.status) {
        return refresh()
      }
      return getEventsFailure(get(error, 'response.data.error', ''))
    }
    )})
)

const addEventEpic = (action$, state$) => action$.pipe(
  ofType(types.ADD_EVENT),
  mergeMap(({ payload }) => 
    axios.post(CONSTANTS.SERVER.ADD_EVENT, {
      title: payload.title,
      description: payload.description,
      start: payload.start,
      end: payload.end,
      busy: payload.busy,
      public: payload.shared
    }, {
      headers: {
        "auth-token": get(state$, 'value.user.authToken', '') 
      }
    })
    .then((res) => {
      if(res.status === 299) {
        const conflicts = res.data.events.map(e => e.title)
        return addEventFailure('Can\'t add. Conflicts with '.concat(conflicts))
      } else {
        return addEventSuccess()
      }
    })
    .catch((error) => {
      if (error.response.status) {
        return refresh()
      }
      return addEventFailure(get(error, 'response.data.error', ''))
    }))
)

const editEventEpic = (action$, state$) => action$.pipe(
  ofType(types.EDIT_EVENT),
  mergeMap(({ payload }) => 
    axios.post(CONSTANTS.SERVER.EDIT_EVENT, {
      id: payload.id,
      toUpdate: payload.toUpdate
    }, {
      headers: {
        "auth-token": get(state$, 'value.user.authToken', '') 
      }
    })
    .then((res) => {
      if(res.status === 299) {
        const conflicts = res.data.events.map(e => e.title)
        return editEventFailure('Can\'t add. Conflicts with '.concat(conflicts))
      } else {
        return editEventSuccess(payload.id, payload.toUpdate)
      }
    })
    .catch((error) => {
      if (error.response.status) {
        return refresh()
      }
      return addEventFailure(get(error, 'response.data.error', ''))
    }))
)


const searchEventsEpic = (action$, state$) => action$.pipe(
  ofType(types.SEARCH_EVENTS),
  mergeMap(({ payload }) => 
    axios.post(CONSTANTS.SERVER.SEARCH_EVENTS, {
      searchString: payload.searchString
    }, {
      headers: {
        "auth-token": get(state$, 'value.user.authToken', '') 
      }
    }).then(res => {
      const events = res.data.data.events
      return searchEventsSuccess(events)
    }).catch(error => {
      if (error.response.status) {
        return refresh()
      }
      return searchEventsFailure(get(error, 'response.data.error', ''))
    })
  )
)


const removeEventEpic = (action$, state$) => action$.pipe(
  ofType(types.REMOVE_EVENT),
  mergeMap(({ payload }) => 
    axios.post(CONSTANTS.SERVER.REMOVE_EVENT, {
      id: payload.id
    }, {
      headers: {
        "auth-token": get(state$, 'value.user.authToken', '') 
      }
    }).then(res => {
      return removeEventSuccess(payload.id)
    })
    .catch(error => {
      if (error.response.status) {
        return refresh()
      }
      return removeEventFailure(get(error, 'response.data.error', ''))
    })
  )
)

export default combineEpics(
  getEventsByMonthEpic,
  addEventEpic,
  editEventEpic,
  searchEventsEpic,
  removeEventEpic
)
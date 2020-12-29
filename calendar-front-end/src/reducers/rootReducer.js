import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import user from './userReducer'
import userEpics from '../epics/user'
import events from './eventsReducer'
import eventsEpics from '../epics/events'

const rootReducer = combineReducers({
  user,
  events
})

export const rootEpic = combineEpics(
  userEpics,
  eventsEpics
)

export default rootReducer
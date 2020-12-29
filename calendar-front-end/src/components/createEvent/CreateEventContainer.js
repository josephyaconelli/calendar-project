import { connect } from 'react-redux'
import { CreateEvent } from './CreateEvent'
import { get } from 'lodash' 
import { addEvent, editEvent } from '../../actions/eventsActions'

const mapStateToProps = (state) => {

  const isError = !!get(state, 'events.error', false)
  const tmpEvents = !isError ? get(state, 'events', null) : null

  return ({
    isLoggedIn: !!get(state, 'user.authToken', false),
    isError: !!get(state, 'events.error', false),
    error: get(state, 'events.error', ''),
    wasSuccessful: get(state, 'events.eventAdded', false),
    events: Array.isArray(tmpEvents) ? tmpEvents : Array.isArray(get(tmpEvents, 'events', null)) ? tmpEvents.events : null
  })
}

const mapDispatchToProps = (dispatch) => ({
  addEvent: (
    title,
    description,
    start,
    end,
    busy,
    shared) => dispatch(addEvent(
      title,
      description,
      start,
      end,
      busy,
      shared)),
    editEvent: (id, toUpdate) => dispatch(editEvent(id, toUpdate))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEvent)
import { connect } from 'react-redux'
import { Main } from './Calendar'
import { getEventsByMonth } from '../../actions/eventsActions'
import { get } from 'lodash' 


const mapStateToProps = (state) => {
  const isError = !!get(state, 'events.error', false)
  const tmpEvents = !isError ? get(state, 'events', null) : null

  return ({
    isLoggedIn: !!get(state, 'user.authToken', false),
    isError,
    error: get(state, 'events.error', ''),
    events: Array.isArray(tmpEvents) ? tmpEvents : Array.isArray(tmpEvents.events) ? tmpEvents.events : null
  })
}

const mapDispatchToProps = (dispatch) => ({
  getEventsByMonth: (month, year) => dispatch(getEventsByMonth(month, year))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
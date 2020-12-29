import { connect } from 'react-redux'
import { EventInfo } from './EventInfo'
import { editEvent, removeEvent } from '../../actions/eventsActions'
import { get } from 'lodash' 


const mapStateToProps = (state) => {
  const isError = !!get(state, 'events.error', false)
  const tmpEvents = !isError ? get(state, 'events', null) : null

  return ({
    isLoggedIn: !!get(state, 'user.authToken', false),
    isError,
    error: get(state, 'events.error', ''),
  })
}

const mapDispatchToProps = (dispatch) => ({
  removeEvent: (id) => dispatch(removeEvent(id)),
  shareEvent: (id) => dispatch(editEvent(id, { public: true })),
  unshareEvent: (id) => dispatch(editEvent(id, { public: false }))

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventInfo)
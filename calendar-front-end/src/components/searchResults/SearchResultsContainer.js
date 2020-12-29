import { connect } from 'react-redux'
import { SearchResults } from './SearchResults'
import { searchEvents } from '../../actions/eventsActions'
import { get } from 'lodash' 


const mapStateToProps = (state) => {
  const isError = !!get(state, 'events.error', false)
  const tmpEvents = !isError ? get(state, 'events', null) : null

  return ({
    isLoggedIn: !!get(state, 'user.authToken', false),
    isError,
    error: get(state, 'events.error', ''),
    events: Array.isArray(tmpEvents) ? tmpEvents : null
  })
}

const mapDispatchToProps = (dispatch) => ({
  searchEvents: (searchString) => dispatch(searchEvents(searchString))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults)
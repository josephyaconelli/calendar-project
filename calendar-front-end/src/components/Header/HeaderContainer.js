import { connect } from 'react-redux'
import { Header } from './Header'
import { get } from 'lodash' 
import { logOut } from '../../actions/userActions'

const mapStateToProps = (state) => {
  return ({
    isLoggedIn: !!get(state, 'user.authToken', false),
  })
}

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
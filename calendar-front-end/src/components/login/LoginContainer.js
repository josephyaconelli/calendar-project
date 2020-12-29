import { connect } from 'react-redux'
import { Login } from './Login'
import { logIn } from '../../actions/userActions'
import { get } from 'lodash' 

const mapStateToProps = (state) => ({
  isLoggedIn: !!get(state, 'user.authToken', false),
  isError: !!get(state, 'user.error', false),
  error: get(state, 'user.error', '')
})

const mapDispatchToProps = (dispatch) => ({
  logIn: (email, password) => dispatch(logIn(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
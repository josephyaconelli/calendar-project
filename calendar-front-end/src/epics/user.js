import { combineEpics } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import axios from 'axios'
import { get } from 'lodash'
import * as types from '../actions/actionTypes'
import CONSTANTS from '../constants/constants'
import { logInSuccess, logInFailure, refreshSuccess, refreshFailure } from '../actions/userActions'

const logInEpic = action$ => action$.pipe(
  ofType(types.LOG_IN),
  mergeMap(({ payload }) => 
    axios.post(CONSTANTS.SERVER.LOGIN, {
      email: payload.email,
      password: payload.password
    })
    .then((res) => {
      const authToken = res.data.data.token
      const refreshToken = res.data.data.refreshToken
      return logInSuccess(payload.email, authToken, refreshToken)
    })
    .catch((error) => {
      return logInFailure(error.response.data.error)
    })
  )
)

const refreshEpic = (action$, state$) => action$.pipe(
  ofType(types.REFRESH),
  mergeMap(({ payload }) =>
    axios.post(CONSTANTS.SERVER.REFRESH, {}, {
      headers: {
        "refresh-token": get(state$, 'value.user.refreshToken', '')
      }
    })
    .then(res => refreshSuccess(res.data.data.token))
    .catch(error => refreshFailure(error.response.data.error))
  )
)

export default combineEpics(
  logInEpic,
  refreshEpic
)
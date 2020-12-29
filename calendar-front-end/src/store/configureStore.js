/*
 * Redux + React-Redux boilerplate from following tutorial:
 * https://code.likeagirl.io/tutorial-for-adding-redux-to-a-react-app-1a94cc1738e5
 */

import { createStore, applyMiddleware } from 'redux'
import rootReducer, { rootEpic } from '../reducers/rootReducer'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'authType',
  storage: storage,
  whitelist: ['events', 'user'] // which reducer want to store
}

const pReducer = persistReducer(persistConfig, rootReducer)

const epicMiddleware = createEpicMiddleware()

const configureStore = () => {

  const middlewares = [epicMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [
    middlewareEnhancer
  ]

  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(
    pReducer,
    composedEnhancers
  )
  persistStore(store)

  epicMiddleware.run(rootEpic)
  return store
}

export default configureStore
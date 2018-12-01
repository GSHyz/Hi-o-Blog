import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import loggerMiddleware from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import saga from './auth/sagas'
import authReducer from './auth/reducer'

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
    auth: authReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware, loggerMiddleware))
)
sagaMiddleware.run(saga)

export default store

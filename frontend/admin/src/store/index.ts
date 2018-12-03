import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import loggerMiddleware from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import * as authSaga from './auth/sagas'
import * as blogsSaga from './blogs/sagas'

import authReducer from './auth/reducer'
import blogsReducer from './blogs/reducer'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from 'utils/history'

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    blogs: blogsReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    {},
    composeEnhancers(
        applyMiddleware(
            sagaMiddleware,
            routerMiddleware(history),
            loggerMiddleware
        )
    )
)
const sagaMap = { ...authSaga, ...blogsSaga }
const sagaSet = Object.keys(sagaMap).map(saga => {
    return sagaMap[saga]()
})

function* saga() {
    yield all([...sagaSet])
}

sagaMiddleware.run(saga)

export default store

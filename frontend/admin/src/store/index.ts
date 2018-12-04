import { createStore, applyMiddleware, compose } from 'redux'
import loggerMiddleware from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import * as authSaga from './auth/sagas'
import * as blogsSaga from './blogs/sagas'

import { routerMiddleware } from 'connected-react-router'
import history from 'utils/history'
import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddleware()

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const configStore = (initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
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

    //@ts-ignore
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        console.log(1)
        //@ts-ignore
        module.hot.accept('./rootReducer', () => {
            const nextRootReducer = require('./rootReducer')
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}

export default configStore

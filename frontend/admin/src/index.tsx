import React from 'react'
import { render } from 'react-dom'
import App from './App'
import 'draft-js/dist/Draft.css'
import 'assets/scss/_reset.scss'
import store from 'store/index'
import { Provider } from 'react-redux'

render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('🙃'))

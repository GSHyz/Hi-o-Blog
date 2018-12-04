import React from 'react'
import { render } from 'react-dom'
import App from './App'
import 'draft-js/dist/Draft.css'
import 'assets/scss/_reset.scss'
import { Provider } from 'react-redux'
import configStore from 'store/index'

const store = configStore()

render((<Provider store={store}>
    <App/>
</Provider>), document.getElementById('🙃'))


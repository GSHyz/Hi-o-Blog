import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

@hot(module)
class App extends Component {
    render() {
        return (

            <section className="app">{process.env.REACT_APP_TITLE}</section>
        )
    }
}

export default App

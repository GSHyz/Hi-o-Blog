import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Login from 'pages/login'

@hot(module)
class App extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login} exact/>
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default App

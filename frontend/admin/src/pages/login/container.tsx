import React, { PureComponent } from 'react'
import Login from './components'
import { hot } from 'react-hot-loader'

@hot(module)
class LoginContainer extends PureComponent {
    render(): React.ReactNode {
        return <Login loading={false}/>
    }
}

export default LoginContainer

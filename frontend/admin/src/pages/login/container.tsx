import React, { PureComponent } from 'react'
import Login from './components'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ILoginAction, login } from 'store/auth/actions'

interface IStateToProps {
    loggingIn: boolean,
}

interface IDispatchToProps {
    login: typeof login
}

type IProps = IStateToProps & IDispatchToProps

const mapStateToProps = (state: MODEL.IApp) => ({
    loggingIn: state.auth.loggingIn
})
const mapDispatchToProps = (dispatch: Dispatch<ILoginAction>) => ({
    login: (payload: API.auth.ILoginReq) => dispatch(login(payload))

})

@hot(module)
class LoginContainer extends PureComponent<IProps> {
    render(): React.ReactNode {
        return <Login loading={this.props.loggingIn} login={this.props.login}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)

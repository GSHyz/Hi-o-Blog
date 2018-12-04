import React, { PureComponent } from 'react'
import Login from './components'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ILoginAction, loginAction } from 'store/auth/actions'
import { MODEL } from 'store/model'

interface IStateToProps {
    loggingIn: boolean,
}

interface IDispatchToProps {
    login: typeof loginAction
}

type IProps = IStateToProps & IDispatchToProps

const mapStateToProps = (state: MODEL.IApp) => ({
    loggingIn: state.auth.loggingIn
})
const mapDispatchToProps = (dispatch: Dispatch<ILoginAction>) => ({
    login: (payload: API.auth.ILoginReq) => dispatch(loginAction(payload))

})

class LoginContainer extends PureComponent<IProps> {
    render(): React.ReactNode {
        return <Login loading={this.props.loggingIn} login={this.props.login}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)

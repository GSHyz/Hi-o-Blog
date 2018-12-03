import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import Exception from '../../components/Exception'
import { isLogined } from 'utils/index'
import { hot } from 'react-hot-loader'

const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
    permissionRoute: state.auth.permissionRoute
})

@hot(module)
@connect(mapStateToProps)
class AuthorizedRoute extends PureComponent {
    render() {
        const {
            component: Component,
            pathname,
            permissionRoute,
            ...rest
        } = this.props
        return (
            <Route
                {...rest}
                render={props => {
                    if (isLogined()) {
                        return <Redirect to="/login"/>
                    }
                    if (pathname.indexOf('exception') > -1) {
                        return <Component {...props} />
                    }
                    if (!permissionRoute.find(item => item.path === pathname)) {
                        return <Exception type="403"/>
                    }
                    return <Component {...props} />
                }}
            />
        )
    }
}

export default AuthorizedRoute

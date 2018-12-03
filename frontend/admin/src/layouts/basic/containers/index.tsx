import React, { PureComponent, Suspense } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from 'store/auth/actions'
import BasicLayout from '../components'
import Loading from 'components/PageLoading'
import PropTypes from 'prop-types'
import routerData from 'config/router'
import pathToRegexp from 'path-to-regexp'
import DocumentTitle from 'react-document-title'
import RouteLoading from 'components/RouteLoading'
import { Switch, Redirect } from 'react-router-dom'
import AuthorizedRoute from 'containers/AuthorizedRoute'

const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
    loading: state.auth.getCurrenting,
    username: state.auth.user.username
})
const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch)

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class BasicLayoutContainer extends PureComponent {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        getCurrentUser: PropTypes.func.isRequired,
        pathname: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getCurrentUser()
    }

    getPageTitle = () => {
        const { pathname } = this.props
        let title = process.env.REACT_APP_TITLE
        let currentRouterData = null
        for (const key in routerData) {
            if (routerData.hasOwnProperty(key)) {
                if (pathToRegexp(key).test(pathname)) {
                    currentRouterData = routerData[key]
                    break
                }
            }
        }
        if (currentRouterData && currentRouterData.name) {
            title = `${currentRouterData.name} -- ${title}`
        }
        return title
    }

    render() {
        const { loading, logout } = this.props
        return (
            <DocumentTitle title={this.getPageTitle()}>
                {loading ? (
                    <Loading />
                ) : (
                    <BasicLayout onLogout={logout}>
                        <Suspense fallback={<RouteLoading />}>
                            <Switch>
                                {Object.keys(routerData).map(path => {
                                    if (routerData[path].redirect) {
                                        return (
                                            <Redirect
                                                exact={true}
                                                key={path}
                                                from={path}
                                                to={routerData[path].redirect}
                                            />
                                        )
                                    }
                                    const Component = routerData[path].component
                                    if (Component) {
                                        return (
                                            <AuthorizedRoute
                                                key={path}
                                                path={path}
                                                component={Component}
                                                exect={true}
                                            />
                                        )
                                    }
                                    return null
                                })}
                                <Redirect to="/exception/404" />
                            </Switch>
                        </Suspense>
                    </BasicLayout>
                )}
            </DocumentTitle>
        )
    }
}

export default BasicLayoutContainer

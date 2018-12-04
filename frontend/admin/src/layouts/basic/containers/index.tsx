import React, { PureComponent, Suspense } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import BasicLayout from '../components'
import routerData from 'config/router'
import pathToRegexp from 'path-to-regexp'
import DocumentTitle from 'react-document-title'
import RouteLoading from 'components/RouteLoading'
import { Switch, Redirect, Route } from 'react-router-dom'
// import AuthorizedRoute from 'containers/AuthorizedRoute'
import { MODEL } from 'store/model'
import { getCurrentUserAction, IGetCurrentUserAction, logOutAction } from 'store/auth/actions'

interface IStateToProps {
    pathname: string,
    username: string
}

interface IDispatchToProps {
    getCurrentUser: typeof getCurrentUserAction,
    logOut: typeof logOutAction
}

type IProps = IStateToProps & IDispatchToProps
const mapStateToProps = (state: MODEL.IApp) => ({
    pathname: state.router.location.pathname,
    username: state.auth.username
})
const mapDispatchToProps = (dispatch: Dispatch<IGetCurrentUserAction>) => ({
    getCurrentUser() {
        return dispatch(getCurrentUserAction())
    }
})

class BasicLayoutContainer extends PureComponent<IProps> {

    componentDidMount() {
        // this.props.getCurrentUser()
    }

    getPageTitle = (): string => {
        const { pathname } = this.props
        let title: string = process.env.REACT_APP_TITLE!
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
        const { logOut, username } = this.props
        return (
            <DocumentTitle title={this.getPageTitle()}>
                <BasicLayout onLogout={logOut} username={username}>
                    <Suspense fallback={<RouteLoading/>}>
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
                                        <Route
                                            key={path}
                                            path={path}
                                            component={Component}
                                            exect={true}
                                        />
                                    )
                                }
                                return null
                            })}
                            <Redirect to="/exception/404"/>
                        </Switch>
                    </Suspense>
                </BasicLayout>
            </DocumentTitle>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayoutContainer)

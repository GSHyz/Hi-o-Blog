import React, { PureComponent } from 'react'
import Menu from 'components/Menu'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { makeGetFlatPermissionRoute } from 'store/auth/selectors'
import { MODEL } from 'store/model'
import { IMenuItem } from 'config/menu'

const getSingleOpenKeys = (pathname: string) => {
    const index = pathname.lastIndexOf('/')
    const openKey = pathname.slice(0, index)
    return openKey || pathname
}
const getSingleSelectedKeys = (pathname: string) => {
    let short = ''
    if (pathname.lastIndexOf('/') === pathname.length - 1) {
        short = pathname.slice(0, pathname.length - 1)
    }
    return [pathname, short]
}

const makeMapStateToProps = () => {
    const getFlatPermissionRoute = makeGetFlatPermissionRoute()
    return (state: MODEL.IApp) => ({
        pathname: state.router.location.pathname,
        permissionRoute: getFlatPermissionRoute(state)
    })
}

interface IStateToProps {
    pathname: string
    permissionRoute: IMenuItem[]
}

interface IDsipatchToProps {}

type IProps = IStateToProps & IDsipatchToProps

interface IState {
    openKeys: string[]
    selectedKeys: string[]
    lastOpenKey: string | undefined
}

@hot(module)
class BaseMenuContainer extends PureComponent<IProps, IState> {
    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        const nextOpenKey = getSingleOpenKeys(nextProps.pathname)
        if (prevState.lastOpenKey) {
            if (prevState.lastOpenKey !== nextOpenKey) {
                return {
                    openKeys: [nextOpenKey],
                    selectedKeys: getSingleSelectedKeys(nextProps.pathname),
                    lastOpenKey: nextOpenKey
                }
            }
            return {
                selectedKeys: getSingleSelectedKeys(nextProps.pathname),
                lastOpenKey: nextOpenKey
            }
        }
        return {
            openKeys: [nextOpenKey],
            selectedKeys: getSingleSelectedKeys(nextProps.pathname),
            lastOpenKey: nextOpenKey
        }
    }

    state: IState = {
        openKeys: [getSingleOpenKeys(this.props.pathname)],
        selectedKeys: getSingleSelectedKeys(this.props.pathname),
        lastOpenKey: ''
    }

    render() {
        const { openKeys, selectedKeys } = this.state
        const { permissionRoute } = this.props

        return (
            <Menu
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onOpenChange={this.handleSubChange}
                menus={permissionRoute}
            />
        )
    }

    handleSubChange = (openKeys: string[]) => {
        const latestOpenKey = openKeys.find(
            (key: string) => this.state.openKeys.indexOf(key) === -1
        )
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : []
        })
    }
}

export default connect(makeMapStateToProps)(BaseMenuContainer)

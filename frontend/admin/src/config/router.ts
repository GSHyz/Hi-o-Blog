import { lazy } from 'react'
import pathToRegexp from 'path-to-regexp'
import { getMenuData } from './menu'

const routerConfig = {
    '/': {
        redirect: '/blog'
    },
    '/blog': {
        component: lazy(() =>
            import(/* webpackChunkName: "blog" */ 'pages/blog')
        )
    },
    '/log': {
        component: lazy(() => import(/* webpackChunkName: "log" */ 'pages/log'))
    },
    '/exception/403': {
        component: lazy(() =>
            import(/* webpackChunkName: "403" */ 'pages/exception/403')
        )
    },
    '/exception/404': {
        component: lazy(() =>
            import(/* webpackChunkName: "404" */ 'pages/exception/404')
        )
    },
    '/exception/500': {
        component: lazy(() =>
            import(/* webpackChunkName: "500" */ 'pages/exception/500')
        )
    }
}

const getFlatMenuData = (menus: ReturnType<typeof getMenuData>) => {
    let keys = {}
    menus.forEach(item => {
        if (item.children) {
            keys[item.path] = { ...item }
            keys = { ...keys, ...getFlatMenuData(item.children) }
        } else {
            keys[item.path] = { ...item }
        }
    })
    return keys
}
const findMenuKey = (
    menuData: ReturnType<typeof getFlatMenuData>,
    path: string
): null | string | undefined => {
    const menuKey = Object.keys(menuData).find(key =>
        pathToRegexp(path).test(key)
    )
    if (menuKey == null) {
        if (path === '/') {
            return null
        }
        const lastIdx = path.lastIndexOf('/')
        if (lastIdx < 0) {
            return null
        }
        if (lastIdx === 0) {
            return findMenuKey(menuData, '/')
        }
        // 如果没有，使用上一层的配置
        return findMenuKey(menuData, path.substr(0, lastIdx))
    }
    return menuKey
}

const menuData = getFlatMenuData(getMenuData())

const routerData = {}
// The route matches the menu
Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    let menuKey: null | string | undefined = Object.keys(menuData).find(key =>
        pathToRegexp(path).test(`${key}`)
    )
    if (menuKey == null) {
        menuKey = findMenuKey(menuData, path)
    }
    let menuItem = {} as API.auth.IMenuItem
    // If menuKey is not empty
    if (menuKey) {
        menuItem = menuData[menuKey]
    }
    let router = routerConfig[path]
    router = {
        ...router,
        name: router.name || menuItem.name
    }
    routerData[path] = router
})
export default routerData

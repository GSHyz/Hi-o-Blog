import isEmpty from 'lodash/isEmpty'
import { isUrl } from 'utils/index'

// menu data
const menuConfig: API.auth.IMenuItem[] = [
    {
        name: '博客管理',
        path: 'blog',
        children: [
            {
                name: '文章列表',
                path: 'index'
            },
            {
                name: '新建博客',
                path: 'create'
            }
        ]
    },
    {
        name: '日志分析',
        path: 'log'
    }
]

const formatter = (data: API.auth.IMenuItem[], parentPath = '/') => {
    return data.map(item => {
        let { path } = item
        if (!isUrl(path)) {
            path = parentPath + item.path
        }
        const result = {
            ...item,
            path
        }
        if (item.children && item.children.length > 0) {
            result.children = formatter(
                item.children,
                `${parentPath}${item.path}/`
            )
        }
        return result
    })
}

const filterMenu = (menu: API.auth.IMenuItem, mapping = {}, parent = '') => {
    const currentPath = `${parent}/${menu.path}`
    if (!menu.children) {
        return mapping[currentPath] && menu
    }
    const filtered = { ...menu }
    filtered.children = []
    for (const child of menu.children) {
        const filteredChild = filterMenu(child, mapping, currentPath)
        if (filteredChild) {
            filtered.children.push(filteredChild)
        }
    }
    if (isEmpty(filtered.children)) {
        return
    }
    return filtered
}

export const getFilteredMenuData = (menus: string[]) => {
    // 默认有全部权限
    if (isEmpty(menus)) {
        return formatter(menuConfig)
    }
    const filteredMenus = []
    const mapping = {}
    for (const m of menus) {
        mapping[m] = true
    }
    for (const menu of menuConfig) {
        const filtered = filterMenu(menu, mapping)
        if (filtered) {
            filteredMenus.push(filtered)
        }
    }
    return formatter(filteredMenus)
}

export const getMenuData = () => formatter(menuConfig)

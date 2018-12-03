import { createSelector } from 'reselect'
import { getFilteredMenuData } from 'config/menu'
import { MODEL } from 'store/model'

const getPermissionRoute = (state: MODEL.IApp) => state.auth.permissionRouter
export const makeGetFlatPermissionRoute = () =>
    createSelector(
        [getPermissionRoute],
        menus => getFilteredMenuData(menus.map(item => item.path))
    )

import constants from 'store/auth/constants'

export interface ILoginAction {
    type: constants.LOGIN_REQUEST
    payload: API.auth.ILoginReq
}

export interface ILoginSuccessAction {
    type: constants.LOGIN_SUCCESS
    payload: API.auth.ILoginRes
}

export interface ILoginFailureAction {
    type: constants.LOGIN_FAILURE
    payload: string
}

export interface ILogoutAction {
    type: constants.LOGOUT
}

export interface IGetCurrentUserAction {
    type: constants.GET_CURRENT_USER
}

export interface IGetCurrentUserSuccessAction {
    type: constants.GET_CURRENT_USER_SUCCESS
    payload: API.auth.IMenuItem[]
}

export interface IGetCurrentUserFailureAction {
    type: constants.GET_CURRENT_USER_FAILURE
    payload: string
}

export const loginAction = (payload: API.auth.ILoginReq): ILoginAction => ({
    type: constants.LOGIN_REQUEST,
    payload
})

export const loginSuccessAction = (
    payload: API.auth.ILoginRes
): ILoginSuccessAction => ({
    type: constants.LOGIN_SUCCESS,
    payload
})

export const loginFailureAction = (err: API.error): ILoginFailureAction => ({
    type: constants.LOGIN_FAILURE,
    payload: err.message
})

export const logOutAction = (): ILogoutAction => ({
    type: constants.LOGOUT
})

export const getCurrentUserAction = (): IGetCurrentUserAction => ({
    type: constants.GET_CURRENT_USER
})
export const getCurrentUserSuccessAction = (
    payload: API.auth.IGetCurrentUserRes
): IGetCurrentUserSuccessAction => ({
    type: constants.GET_CURRENT_USER_SUCCESS,
    payload: payload.permissionRoute
})

export const getCurrentUserFailureAction = (
    payload: API.error
): IGetCurrentUserFailureAction => ({
    type: constants.GET_CURRENT_USER_FAILURE,
    payload: payload.message
})

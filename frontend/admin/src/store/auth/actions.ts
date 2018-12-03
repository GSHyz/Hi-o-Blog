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

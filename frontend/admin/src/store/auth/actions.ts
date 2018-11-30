import constants from './constants'

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

export const login = (payload: API.auth.ILoginReq): ILoginAction => ({
    type: constants.LOGIN_REQUEST,
    payload
})

export const loginSuccess = (
    payload: API.auth.ILoginRes
): ILoginSuccessAction => ({
    type: constants.LOGIN_SUCCESS,
    payload
})

export const loginFailure = (err: API.error): ILoginFailureAction => ({
    type: constants.LOGIN_FAILURE,
    payload: err.message
})

import constants from './constants'

export const login = (payload: API.auth.ILoginReq) => ({
    type: constants.LOGIN_REQUEST,
    payload
})

export const loginSuccess = (payload: API.auth.ILoginRes) => ({
    type: constants.LOGIN_SUCCESS,
    payload
})

export const loginFailure = (err: API.error) => ({
    type: constants.LOGIN_FAILURE,
    payload: err.message
})

export type ILoginAction = ReturnType<typeof login>
export type ILoginSuccessAction = ReturnType<typeof loginSuccess>
export type ILoginFailureAction = ReturnType<typeof loginFailure>

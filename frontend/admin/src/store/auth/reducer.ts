import {
    ILoginAction,
    ILoginFailureAction,
    ILoginSuccessAction
} from './actions'
import constants from 'store/auth/constants'
import { MODEL } from 'store/model'

const initialState: MODEL.IAuth = {
    username: '',
    token: '',
    error: '',
    loggingIn: false,
    permissionRouter: []
}
type Action = ILoginAction | ILoginSuccessAction | ILoginFailureAction
export default (state = initialState, action: Action): MODEL.IAuth => {
    switch (action.type) {
        case constants.LOGIN_REQUEST:
            return { ...state, loggingIn: true }
        case constants.LOGIN_SUCCESS:
            return { ...state, loggingIn: false, error: '', ...action.payload }
        case constants.LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                token: '',
                username: '',
                error: action.payload
            }
        default:
            return state
    }
}

import { call, take, all, put } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import {
    ILoginAction,
    loginFailureAction,
    loginSuccessAction,
    logOutAction
} from 'store/auth/actions'
import constants from './constants'
import { fetchLogin } from 'api/auth'
import { push } from 'connected-react-router'
import { notification } from 'antd'

function* logoutFlow() {
    while (true) {
        yield take(constants.LOGOUT)
        yield put(logOutAction())
        localStorage.removeItem('token')
        yield put(push('/loginAction'))
    }
}

function* login(payload: API.auth.ILoginReq): SagaIterator {
    try {
        const data: API.auth.ILoginRes = yield call(fetchLogin, payload)
        yield put(loginSuccessAction(data))
        localStorage.setItem('token', data.token)
        yield put(push('/'))
    } catch (error) {
        yield put(loginFailureAction(error))
        localStorage.removeItem('token')
        notification.error({
            message: '登录失败',
            description: error.message
        })
    }
}

function* loginFlow(): SagaIterator {
    while (true) {
        const { payload }: ILoginAction = yield take(constants.LOGIN_REQUEST)
        yield call(login, payload)
    }
}

export default function*() {
    yield all([loginFlow(), logoutFlow()])
}

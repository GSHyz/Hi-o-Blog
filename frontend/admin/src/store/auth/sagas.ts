import { call, take, all, put } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { ILoginAction, loginFailure, loginSuccess } from 'store/auth/actions'
import constants from './constants'
import { fetchLogin } from 'api/auth'
import { push } from 'connected-react-router'
import { notification } from 'antd'

function* login(payload: API.auth.ILoginReq): SagaIterator {
    try {
        const data: API.auth.ILoginRes = yield call(fetchLogin, payload)
        yield put(loginSuccess(data))
        localStorage.setItem('token', data.token)
        yield put(push('/'))
    } catch (error) {
        yield put(loginFailure(error))
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
    yield all([loginFlow()])
}

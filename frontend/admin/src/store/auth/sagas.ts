import { call, take, fork, all, put } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { ILoginAction, loginFailure, loginSuccess } from 'store/auth/actions'
import constants from './constants'
import { fetchLogin } from 'api/auth'

function* login(payload: API.auth.ILoginReq): SagaIterator {
    try {
        const data: API.auth.ILoginRes = yield call(fetchLogin, payload)
        yield put(loginSuccess(data))
        localStorage.setItem('token', data.token)
    } catch (error) {
        let ex = error as API.error
        yield put(loginFailure(ex))
    }
}

function* loginFlow(): SagaIterator {
    while (true) {
        const { payload }: ILoginAction = yield take(constants.LOGIN_REQUEST)
        yield call(login, payload)
    }
}

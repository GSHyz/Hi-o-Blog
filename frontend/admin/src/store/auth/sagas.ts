import { call, take, put, select } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import {
    ILoginAction,
    loginFailureAction,
    loginSuccessAction,
    logOutAction,
    getCurrentUserFailureAction,
    getCurrentUserSuccessAction
} from 'store/auth/actions'
import { isLogined } from 'utils/index'
import constants from './constants'
import { fetchLogin, fetchAuthorize } from 'api/auth'
import { push } from 'connected-react-router'
import { notification } from 'antd'
import { MODEL } from 'store/model'

const getPathname = (state: MODEL.IApp) => state.router.location.pathname

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

export function* loginFlow(): SagaIterator {
    while (true) {
        const { payload }: ILoginAction = yield take(constants.LOGIN_REQUEST)
        yield call(login, payload)
    }
}

export function* logoutFlow() {
    while (true) {
        yield take(constants.LOGOUT)
        yield put(logOutAction())
        localStorage.removeItem('token')
        yield put(push('/loginAction'))
    }
}

export function* getCurrentUserFlow(): SagaIterator {
    while (true) {
        yield take(constants.GET_CURRENT_USER)
        const pathname = yield select(getPathname)
        if (isLogined()) {
            try {
                const data: API.auth.IGetCurrentUserRes = yield call(
                    fetchAuthorize
                )
                yield put(getCurrentUserSuccessAction(data))
                if (pathname === '/login') {
                    yield put(push('/'))
                }
            } catch (e) {
                yield put(getCurrentUserFailureAction(e))
                yield call(notification.warning, {
                    message: '登录失效，请重新登录'
                })
                localStorage.removeItem('token')
                if (pathname !== '/login') {
                    yield put(push('/login'))
                }
            }
        } else {
            yield put(getCurrentUserFailureAction(new Error('未登录')))
            localStorage.removeItem('token')
            console.log('logout')
            if (pathname !== '/login') {
                yield put(push('/login'))
            }
        }
    }
}

// export default function* () {
//     yield all([loginFlow(), logoutFlow(), getCurrentUserFlow()])
// }

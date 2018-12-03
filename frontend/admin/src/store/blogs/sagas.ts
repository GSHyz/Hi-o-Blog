import constants from './constants'
import { getBlogsFailureAction, getBlogsSuccessAction } from './actions'
import { take, fork, call, cancel, put } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { fetchBlogs } from 'api/blogs'
import { notification } from 'antd'

function* forkBlogsFlow(payload: API.blogs.IGetBlogsReq): SagaIterator {
    try {
        const data: API.blogs.IGetBlogsRes = yield call(fetchBlogs, payload)
        yield put(getBlogsSuccessAction(data))
    } catch (e) {
        yield put(getBlogsFailureAction(e))
        notification.error({
            message: '获取博客列表失败',
            description: e.message
        })
    }
}

export function* getBlogsFlow(payload: API.blogs.IGetBlogsReq): SagaIterator {
    while (true) {
        yield take(constants.GET_BLOGS)
        try {
            const task = yield fork(forkBlogsFlow, payload)

            yield take(constants.GET_BLOG_CANCEL)
            cancel(task)
        } catch (e) {}
    }
}

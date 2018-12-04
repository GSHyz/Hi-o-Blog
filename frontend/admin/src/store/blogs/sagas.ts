import constants from './constants'
import {
    createBlogFailureAction,
    createBlogSuccessAction,
    getBlogsFailureAction,
    getBlogsSuccessAction,
    ICreateBlogAction,
    IGetBlogsAction
} from './actions'
import { take, fork, call, cancel, put } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { fetchBlogs, fetchCreateBlog } from 'api/blogs'
import { notification, Modal } from 'antd'

import { push } from 'connected-react-router'

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

export function* getBlogsFlow(): SagaIterator {
    while (true) {
        const { payload }: IGetBlogsAction = yield take(constants.GET_BLOGS)
        try {
            const task = yield fork(forkBlogsFlow, payload)

            yield take(constants.GET_BLOG_CANCEL)
            cancel(task)
        } catch (e) {}
    }
}

function confirm() {
    return new Promise((resolve, reject) => {
        Modal.confirm({
            title: '添加成功',
            okText: '查看',
            cancelText: '继续添加',
            onOk: () => resolve(),
            onCancel: () => reject()
        })
    })
}

export function* createBlogFlow(): SagaIterator {
    while (true) {
        const { payload, form }: ICreateBlogAction = yield take(
            constants.CREATE_BLOG
        )
        try {
            yield call(fetchCreateBlog, payload)
            yield put(createBlogSuccessAction())
            try {
                // @ts-ignore
                yield confirm()
                yield put(push('/blog'))
            } catch (e) {
                form.resetFields()
                // @ts-ignore
                form.editor.value('')
            }
        } catch (e) {
            yield put(createBlogFailureAction(e))
            notification.error({
                message: '添加失败',
                description: e.message
            })
        }
    }
}

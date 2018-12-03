import constants from 'store/blogs/constants'
import { WrappedFormUtils } from 'antd/es/form/Form'

export interface IGetBlogsAction {
    type: constants.GET_BLOGS
    payload: API.blogs.IGetBlogsReq
}

export interface IGetBlogsSuccessAction {
    type: constants.GET_BLOGS_SUCCESS
    payload: API.blogs.IGetBlogsRes
}

export interface IGetBlogsFailureAction {
    type: constants.GET_BLOG_FAILURE
    payload: string
}

export interface IGetBlogsCancelAction {
    type: constants.GET_BLOG_CANCEL
}

export interface ICreateBlogAction {
    type: constants.CREATE_BLOG
    payload: API.blogs.ICreateBlogReq
    form: WrappedFormUtils
}

export interface ICreateBlogSuccessAction {
    type: constants.CREATE_BLOG_SUCCESS
}

export interface ICreteBlogFailureAction {
    type: constants.CREATE_BLOG_FAILURE
    payload: string
}

export const getBlogsAction = (
    payload: API.blogs.IGetBlogsReq
): IGetBlogsAction => ({
    type: constants.GET_BLOGS,
    payload
})

export const getBlogsSuccessAction = (
    payload: API.blogs.IGetBlogsRes
): IGetBlogsSuccessAction => ({
    type: constants.GET_BLOGS_SUCCESS,
    payload
})

export const getBlogsFailureAction = (
    payload: API.error
): IGetBlogsFailureAction => ({
    type: constants.GET_BLOG_FAILURE,
    payload: payload.message
})

export const getBlogsCancelAction = (): IGetBlogsCancelAction => ({
    type: constants.GET_BLOG_CANCEL
})

export const createBlogAction = (
    payload: API.blogs.ICreateBlogReq,
    form: WrappedFormUtils
): ICreateBlogAction => ({
    type: constants.CREATE_BLOG,
    payload,
    form
})

export const createBlogSuccessAction = (): ICreateBlogSuccessAction => ({
    type: constants.CREATE_BLOG_SUCCESS
})

export const createBlogFailureAction = (
    payload: API.error
): ICreteBlogFailureAction => ({
    type: constants.CREATE_BLOG_FAILURE,
    payload: payload.message
})

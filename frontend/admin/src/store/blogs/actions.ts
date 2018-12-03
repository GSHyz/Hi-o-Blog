import constants from 'store/blogs/constants'

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

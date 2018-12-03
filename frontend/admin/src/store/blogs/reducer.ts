import {
    IGetBlogsAction,
    IGetBlogsCancelAction,
    IGetBlogsFailureAction,
    IGetBlogsSuccessAction
} from './actions'
import { MODEL } from 'store/model'
import constants from 'store/blogs/constants'

const initialState: MODEL.IBlogs = {
    loading: false,
    total: 0,
    data: [],
    error: ''
}

type Action =
    | IGetBlogsAction
    | IGetBlogsSuccessAction
    | IGetBlogsFailureAction
    | IGetBlogsCancelAction

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case constants.GET_BLOGS:
            return { ...state, loading: true }
        case constants.GET_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                total: action.payload.total,
                data: action.payload.data
            }
        case constants.GET_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                total: 0,
                data: []
            }
        case constants.GET_BLOG_CANCEL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

import { RouterState } from 'connected-react-router'

/**
 *  redux store state tree
 */
declare module MODEL {
    export interface IApp {
        auth: IAuth
        router: RouterState
        blogs: IBlogs
    }

    export interface IAuth {
        token: string
        error: string
        username: string
        loggingIn: boolean
        permissionRoute: API.auth.IMenuItem[]
    }

    export interface IBlogs extends API.blogs.IGetBlogsRes {
        loading: boolean
        error: string
    }
}

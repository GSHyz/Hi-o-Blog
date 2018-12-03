import { RouterState } from 'connected-react-router'

/**
 *  redux store state tree
 */
declare module MODEL {
    export interface IApp {
        auth: IAuth
        router: RouterState
    }

    export interface IAuth {
        token: string
        error: string
        username: string
        loggingIn: boolean
        permissionRoute: { path: string }[]
    }
}

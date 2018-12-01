import { RouterState } from 'connected-react-router'

declare namespace MODEL {
    export interface IApp {
        auth: IAuth
        router: RouterState
    }

    export interface IAuth {
        token: string
        error: string
        username: string
        loggingIn: boolean
    }
}

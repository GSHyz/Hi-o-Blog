declare namespace MODEL {
    export interface IApp {
        auth: IAuth
    }

    export interface IAuth {
        token: string
        error: string
        username: string
        loggingIn: boolean
    }
}

declare namespace API {
    namespace auth {
        export interface ILoginReq {
            username: string
            password: string
        }

        export interface ILoginRes {
            token: string
        }
    }

    export interface error extends Error {
        code?: number
        message: string

        [propName: string]: any
    }
}

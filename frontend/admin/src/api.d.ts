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

    export interface error {
        code?: number
        message: string

        [propName: string]: any
    }
}

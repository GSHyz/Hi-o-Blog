declare namespace API {
    export interface IPagination {
        pageSize?: number
        page?: number
    }

    namespace auth {
        export interface IMenuItem {
            name: string
            path: string
            children?: IMenuItem[]
        }

        export interface ILoginReq {
            username: string
            password: string
        }

        export interface ILoginRes {
            token: string
        }

        export interface IGetCurrentUserRes {
            permissionRoute: IMenuItem[]
            username: string
        }
    }

    namespace blogs {
        export interface IBlogItem {
            id: string | number
            author: string
            createdTime: Date
            publishTime: Date
            updateTime: Date
            content: string
        }

        export type IGetBlogsReq = IPagination

        export interface IGetBlogsRes {
            total: number
            data: IBlogItem[]
        }

        export interface ICreateBlogReq {
            author: string
            content: string
        }

        export type ICreateBlogRes = {}
    }

    export interface error {
        code?: number
        message: string

        [propName: string]: any
    }
}

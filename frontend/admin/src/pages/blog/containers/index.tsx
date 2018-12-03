import React, { PureComponent } from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { MODEL } from 'store/model'
import { getBlogsAction, getBlogsCancelAction, IGetBlogsAction, IGetBlogsCancelAction } from 'store/blogs/actions'
import { Card } from 'antd'

interface IStateToProps {
    loading: boolean,
    blogs: API.blogs.IBlogItem[],
    total: number | string
}

interface IDispacthToProps {
    getBlogs: typeof getBlogsAction,
    cancelGetBlogs: typeof getBlogsCancelAction
}

const mapStateToProps = (state: MODEL.IApp) => ({
    loading: state.blogs.loading,
    blogs: state.blogs.data,
    total: state.blogs.total
})

const mapDispatchToProps = (dispatch: Dispatch<IGetBlogsAction | IGetBlogsCancelAction>) => ({
    getBlogs: (payload: API.blogs.IGetBlogsReq) => dispatch(getBlogsAction(payload)),
    cancelGetBlogs: () => dispatch(getBlogsCancelAction())
})
type IProps = IStateToProps & IDispacthToProps

@hot(module)
class Index extends PureComponent<IProps> {

    componentDidMount(): void {
        this.props.getBlogs({
            pageSize: 10,
            page: 1
        })
    }

    componentWillUnmount(): void {
        this.props.cancelGetBlogs()
    }

    render() {
        return (
            <>
                <Card>

                </Card>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)

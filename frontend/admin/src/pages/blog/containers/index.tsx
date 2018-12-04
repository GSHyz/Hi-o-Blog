import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { MODEL } from 'store/model'
import {
    createBlogAction,
    getBlogsAction,
    getBlogsCancelAction, ICreateBlogAction,
    IGetBlogsAction,
    IGetBlogsCancelAction
} from 'store/blogs/actions'
import { Card, Form, Button, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { WrappedFormUtils } from 'antd/es/form/Form'

const { Item } = Form

interface IStateToProps extends FormComponentProps {
    loading: boolean,
    blogs: API.blogs.IBlogItem[],
    total: number | string
}

interface IDispacthToProps {
    getBlogs: typeof getBlogsAction,
    cancelGetBlogs: typeof getBlogsCancelAction,
    createBlog: typeof createBlogAction
}

const mapStateToProps = (state: MODEL.IApp) => ({
    loading: state.blogs.loading,
    blogs: state.blogs.data,
    total: state.blogs.total
})

const mapDispatchToProps = (dispatch: Dispatch<IGetBlogsAction | IGetBlogsCancelAction | ICreateBlogAction>) => ({
    getBlogs: (payload: API.blogs.IGetBlogsReq) => dispatch(getBlogsAction(payload)),
    cancelGetBlogs: () => dispatch(getBlogsCancelAction()),
    createBlog: (payload: API.blogs.ICreateBlogReq, form: WrappedFormUtils) => dispatch(createBlogAction(payload, form))
})
type IProps = IStateToProps & IDispacthToProps

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

    handleSubmit: React.ReactEventHandler<HTMLButtonElement> = (ev) => {
        ev.preventDefault()
        this.props.form.validateFields((error, payload: API.blogs.ICreateBlogReq) => {
            if (!error) {
                this.props.createBlog(payload, this.props.form)
            }
        })
    }

    render() {
        const { form } = this.props
        const { getFieldDecorator } = form
        return (
            <>
                <Card>
                    <Form>
                        <Item>
                            {getFieldDecorator('author')(
                                <Input/>
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('content')(
                                <Input/>
                            )}
                        </Item>
                        <Item>
                            <Button onClick={this.handleSubmit}>submit</Button>
                        </Item>
                    </Form>
                </Card>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Index))

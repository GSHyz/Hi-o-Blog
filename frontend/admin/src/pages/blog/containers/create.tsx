import React, { PureComponent } from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { MODEL } from 'store/model'
import {
    createBlogAction,
    ICreateBlogAction
} from 'store/blogs/actions'
import { Card, Form, Button, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { WrappedFormUtils } from 'antd/es/form/Form'
import RichTextEditor from 'react-rte'
import ReactMarkdown from 'react-markdown'

const { Item } = Form

interface IStateToProps extends FormComponentProps {
    onChange(value: string): void

    loading: boolean
}

interface IDispacthToProps {
    createBlog: typeof createBlogAction
}

interface IState {
    value: any,
    markdown: string
}

const mapStateToProps = (state: MODEL.IApp) => ({
    loading: state.blogs.loading,
    blogs: state.blogs.data,
    total: state.blogs.total
})

const mapDispatchToProps = (dispatch: Dispatch<ICreateBlogAction>) => ({
    createBlog: (payload: API.blogs.ICreateBlogReq, form: WrappedFormUtils) => dispatch(createBlogAction(payload, form))
})
type IProps = IStateToProps & IDispacthToProps

@hot(module)
class Create extends PureComponent<IProps, IState> {
    state = {
        value: RichTextEditor.createEmptyValue(),
        markdown: ''
    }
    handleSubmit: React.ReactEventHandler<HTMLButtonElement> = (ev) => {
        ev.preventDefault()
        this.props.form.validateFields((error, payload: API.blogs.ICreateBlogReq) => {
            if (!error) {
                this.props.createBlog({
                    author: payload.author,
                    // @ts-ignore
                    content: payload.content.toString('markdown')
                }, this.props.form)
            }
        })
    }
    handleEditorChange = (value: any) => {
        const markdown = value.toString('markdown')
        this.setState({
            value: value,
            markdown
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
                            {getFieldDecorator('author', {
                                rules: [{
                                    required: true,
                                    message: '请输入作者'
                                }]
                            })(
                                <Input/>
                            )}
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('content', {
                                    initialValue: this.state.value,
                                    rules: [{
                                        min: 50,
                                        message: '内容过短'
                                    }]
                                })(
                                    <RichTextEditor
                                        onChange={this.handleEditorChange}/>
                                )
                            }
                        </Item>
                        <Item>
                            <ReactMarkdown source={this.state.markdown}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Create))

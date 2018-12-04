import React, { PureComponent } from 'react'
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
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

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

class Create extends PureComponent<IProps, IState> {

    public simpleMDE: SimpleMDE | undefined

    componentDidMount(): void {
        this.simpleMDE = new SimpleMDE({
            autosave: {
                enabled: true,
                delay: 1000,
                uniqueId: '123'
            }
        })
        this.simpleMDE!.codemirror.on('change', () => {
            this.props.form.setFieldsValue({
                content: this.simpleMDE!.value()
            })
        })
    }

    componentWillUnmount(): void {
        if (this.simpleMDE) {
            this.simpleMDE.codemirror.off('change')
        }
    }

    handleSubmit: React.ReactEventHandler<HTMLButtonElement> = (ev) => {
        ev.preventDefault()
        // @ts-ignore
        this.props.form.editor = this.simpleMDE
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
                        <Item label="作者">
                            {getFieldDecorator('author', {
                                rules: [{
                                    required: true,
                                    message: '请输入作者'
                                }]
                            })(
                                <Input/>
                            )}
                        </Item>
                        <Item label="内容">
                            {
                                getFieldDecorator('content', {
                                    rules: [{
                                        required: true,
                                        message: '请输入作者'
                                    }],
                                    initialValue: this.simpleMDE ? this.simpleMDE.value() : ''
                                })(
                                    <textarea/>
                                )
                            }
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

import React, { PureComponent } from 'react'
import style from './index.module.scss'
import { Form, Button, Input, Icon } from 'antd'
import { FormComponentProps } from 'antd/es/form'

const { Item } = Form

interface IProps extends FormComponentProps {
    loading: boolean,
}

class Login extends PureComponent<IProps> {

    handleSubmit: React.ReactEventHandler<HTMLButtonElement> = e => {
        e.preventDefault()

    }

    render(): React.ReactNode {
        const { form } = this.props
        const { getFieldDecorator } = form
        return (
            <section className={style.auth}>
                <header className={style.header}>
                    <h1>{process.env.REACT_APP_TITLE}</h1>
                </header>
                <section className={style.form}>
                    <Form onSubmit={this.handleSubmit}>
                        <Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your username!'
                                    }
                                ]
                            })(
                                <Input
                                    autoFocus={true}
                                    size="large"
                                    placeholder="username"
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{
                                                color: 'rgba(0,0,0,.25)'
                                            }}
                                        />
                                    }
                                />
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your Password!'
                                    }
                                ]
                            })(
                                <Input
                                    type="password"
                                    size="large"
                                    placeholder="password"
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{
                                                color: 'rgba(0,0,0,.25)'
                                            }}
                                        />
                                    }
                                />
                            )}
                        </Item>
                        <Item>
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                className={style.loginBtn}
                            >
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </section>
        )
    }
}

export default Form.create()(Login)

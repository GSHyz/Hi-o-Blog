import React, { memo, SFC } from 'react'
import style from './index.module.scss'
import { Avatar, Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { logOutAction } from 'store/auth/actions'

const { Item } = Menu

interface IProps {
    username: string,
    onLogout: typeof logOutAction
}

const dropDownContent = (handleLogout: typeof logOutAction) => (
    <Menu>
        <Item>
            <Link to="/admin/myself">个人中心</Link>
        </Item>
        <Item>
            <Link to="/admin/setting">系统设置</Link>
        </Item>
        <Item>
            <a
                href="/"
                onClick={e => {
                    e.preventDefault()
                    handleLogout()
                }}
            >
                注销
            </a>
        </Item>
    </Menu>
)
const Header: SFC<IProps> = ({ onLogout, username }) => (
    <header className={style.header}>
        <Logo/>
        <Dropdown overlay={dropDownContent(onLogout)}>
            <section className={style.auth}>
                <Avatar icon="user"/>
                {username && <span className={style.name}>{username}</span>}
            </section>
        </Dropdown>
    </header>
)
export default memo(Header)

import React, { memo, SFC } from 'react'
import style from './index.module.scss'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { IMenuItem } from 'config/menu'

const { SubMenu, Item } = Menu

interface IProps {
    selectedKeys: string[]
    openKeys: string[]
    menus: IMenuItem[]

    onOpenChange(keys: string[]): void
}

const BaseMenu: SFC<IProps> = props => (
    <section className={style.menu}>
        <Menu
            mode="inline"
            theme="light"
            selectedKeys={props.selectedKeys}
            openKeys={props.openKeys}
            onOpenChange={props.onOpenChange}
        >
            {props.menus &&
                props.menus.map(item => {
                    if (item.children && item.children.length > 0) {
                        return (
                            <SubMenu key={item.path} title={item.name}>
                                {item.children.map(child => (
                                    <Item key={child.path}>
                                        <Link to={child.path}>
                                            {child.name}
                                        </Link>
                                    </Item>
                                ))}
                            </SubMenu>
                        )
                    }
                    return (
                        <Item key={item.path}>
                            <Link to={item.path}>{item.name}</Link>
                        </Item>
                    )
                })}
        </Menu>
    </section>
)

export default memo(BaseMenu)

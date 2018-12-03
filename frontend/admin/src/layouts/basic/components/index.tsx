import React, { memo, SFC } from 'react'
import style from './index.module.scss'
// import MenuContainer from 'containers/Menu'
import Header from './Header'
import { logOutAction } from 'store/auth/actions'

interface IProps {
    onLogout: typeof logOutAction
}

const BasicLayout: SFC<IProps> = props => (
    <section className={style.layout}>
        <Header onLogout={props.onLogout}/>
        <section className={style.container}>
            {/*<MenuContainer />*/}
            <main className={style.content}>{props.children}</main>
        </section>
    </section>
)

export default memo(BasicLayout)

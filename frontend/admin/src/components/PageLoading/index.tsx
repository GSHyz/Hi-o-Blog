import React, { memo } from 'react'
import { Spin } from 'antd'
import style from './index.module.scss'
const Loading = () => (
    <section className={style.loading}>
            <Spin spinning={true} size="large" />
    </section>
)

export default memo(Loading)

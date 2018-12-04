import React, { memo, SFC } from 'react'
import routerExceptionConfig from 'config/exception'
import style from './index.module.scss'

interface IProps {
    type?: string,
    img?: string,
    desc?: string
}

const Exception: SFC<IProps> = ({ type, img, desc }) => {
    const pageType = type && type in routerExceptionConfig ? type : '404'
    return (
        <section className={style.exception}>
            <section className={style.img}>
                <img
                    src={img || routerExceptionConfig[pageType].img}
                    alt={pageType}
                />
            </section>
            <section className={style.content}>
                <h1>{pageType}</h1>
                <p className={style.desc}>
                    {desc || routerExceptionConfig[pageType].desc}
                </p>
            </section>
        </section>
    )
}

export default memo(Exception)

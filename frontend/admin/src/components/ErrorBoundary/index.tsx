import React, { PureComponent } from 'react'

export default class ErrorBoundary extends PureComponent {
    state = { error: null, errorInfo: null }

    componentDidCatch(error: Error | null, errorInfo: object) {
        this.setState({
            error,
            errorInfo
        })
    }

    render() {
        const { error, errorInfo } = this.state
        if (error && errorInfo) {
            return <section>Oops something wrong</section>
        }
        return this.props.children
    }
}

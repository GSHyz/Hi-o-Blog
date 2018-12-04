import React from 'react'
import nprogress from 'nprogress'
class RouteLoading extends React.PureComponent {
    componentWillMount() {
        nprogress.start()
    }
    componentWillUnmount() {
        nprogress.done()
    }

    render() {
        return null
    }
}

export default RouteLoading

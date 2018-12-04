import axios from 'utils/axios'

export const fetchLogin = (payload: API.auth.ILoginReq) =>
    axios({
        url: '/login',
        method: 'post',
        data: payload
    })
export const fetchAuthorize = () =>
    axios({
        url: '/login'
    })

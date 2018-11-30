import axios from 'utils/axios'

export const fetchLogin = (payload: API.auth.ILoginReq) =>
    axios({
        method: 'post',
        data: payload
    })

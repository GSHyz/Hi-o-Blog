import AXIOS, { AxiosError } from 'axios'
import qs from 'qs'

const axios = AXIOS.create({
    baseURL: process.env.REACT_APP_FETCH_URL,
    timeout: 10000,
    withCredentials: true,
    transformRequest: [
        data => {
            return qs.stringify(data, { arrayFormat: 'brackets' })
        }
    ]
})
axios.interceptors.response.use(
    res => res.data,
    (error: AxiosError) => {
        const { response } = error
        let err: API.error
        if (!response || !response.data || !response.data.message) {
            err = { message: 'server 内部错误' }
            return Promise.reject(error)
        }
        err = { message: response.data.message }
        return Promise.reject(err)
    }
)
export default axios

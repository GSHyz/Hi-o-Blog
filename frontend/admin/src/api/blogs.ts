import axios from 'utils/axios'

export const fetchBlogs = (payload: API.blogs.IGetBlogsReq) =>
    axios({
        url: '/blogs',
        data: payload
    })

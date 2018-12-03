import axios from 'utils/axios'

export const fetchBlogs = (payload: API.blogs.IGetBlogsReq) =>
    axios({
        url: '/blog',
        params: payload
    })

export const fetchCreateBlog = (payload: API.blogs.ICreateBlogReq) =>
    axios({
        url: '/blog',
        method: 'post',
        data: payload
    })

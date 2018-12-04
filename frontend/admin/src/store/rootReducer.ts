import authReducer from './auth/reducer'
import blogsReducer from './blogs/reducer'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from 'utils/history'
const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    blogs: blogsReducer
})

export default rootReducer

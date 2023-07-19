import { configureStore } from "@reduxjs/toolkit"
import NotificationReducer from "./reducers/NotificationReducer"
import BlogReducer from "./reducers/BlogReducer"
import UserReducer from "./reducers/UserReducer"

const user = {
  username: "test",
  name: "test"
}
const blog = {
  title: "test title",
  author: "test author",
  url: "www.test.com",
  likes: 0,
  id: "testtesttest",
  user: user
}
const store = configureStore({
  reducer: {
    notification: NotificationReducer,
    blogs: BlogReducer,
    user: UserReducer,
  },
  preloadedState: {
    notification: [],
    blogs: [blog],
    user: [user]
  }
})

export default store

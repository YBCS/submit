import blogService from '../services/blogs'

const blogReducer = (STATE = [], action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE': {
      return [...STATE, action.data]
    }
    case 'LIKE': {
      const liked = { ...action.data, view: true }
      return STATE.map((s) => (s.id !== liked.id ? s : liked))
    }
    case 'DELETE': {
      const id = action.data
      return STATE.filter((s) => s.id !== id)
    }
    case 'SWITCH_VIEW': {
      const id = action.data
      return STATE.map((s) => s.id === id ? { ...s, view : !s.view } : s)
    }
    case 'COMMENT': {
      let commented = { ...action.blog }
      // commented = commented.comment.concat(action.data)
      commented.comment = commented.comment.concat(action.data)
      console.log('the commented blog in reducer', commented)
      return STATE.map((s) => s.id === action.blog.id ? commented : s)
    }

    default: {
      return STATE
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    let data = await blogService.getAll()
    data = data.map(d => d = { ...d, view: false })
    dispatch({
      type: 'INIT',
      data,
    })
  }
}

export const createaBlog = (blog) => {
  return async (dispatch) => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data,
    })
  }
}

// problem in here now
export const likeBlog = (blogToLike) => {
  return async (dispatch) => {
    // console.log('form dispa ',blogToLike)
    const toLike = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    }
    const data = await blogService.update(toLike)
    // console.log(data)
    dispatch({
      type: 'LIKE',
      data,
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: id,
    })
  }
}

export const setVisible = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'SWITCH_VIEW',
      data: id,
    })
  }
}

export const commentBlog = (comment, blog) => {
  return async (dispatch) => {
    const data = await blogService.createComment(comment, blog)
    console.log('the comment in reducer actoin ', comment)
    console.log('the blog in reducer actoin ', blog)
    dispatch({
      type: 'COMMENT',
      data,
      blog,
    })
  }
}

export default blogReducer

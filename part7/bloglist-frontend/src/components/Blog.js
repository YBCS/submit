import React from 'react'

const Blog = ({ blog, handleLike, handleComment }) => {

  if (!blog) {
    return null
  }

  const handleNewComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    handleComment(comment, blog.id)
  }

  return (
    <div className='blog'>
      <h2> {blog.title} </h2>
      <div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div> added by {blog.user.name}</div>
        {/* {own && <button onClick={() => handleRemove(blog.id)}>remove</button>} */}
        <div>
          <h2>comments</h2>
          <form onSubmit={handleNewComment}>
            <input id='comment' name='comment' />
            <button id='create'>add comment</button>
          </form>
          <ul>
            {blog.comment.map(c => (
              <li key = {c.id}> {c.content} </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Blog

// import React from 'react'
// import PropTypes from 'prop-types'
// import { setVisible } from '../reducers/blogReducer'
// import { useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'

// const Blog = ({ blog, handleLike, handleRemove, own }) => {
//   // const [visible, setVisible] = useState(false)

//   const dispatch = useDispatch()

//   const visible = blog.view

//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     marginBottom: 5,
//   }

//   const label = visible ? 'hide' : 'view'

//   return (
//     <div style={blogStyle} className='blog'>
//       <div>
//         <Link to={`/blogs/${blog.id}`}>
//           <i>{blog.title}</i> by {blog.author}{' '}
//         </Link>
//         {/* <button onClick={() => setVisible(!visible)}>{label}</button> */}
//         <button onClick={() => dispatch(setVisible(blog.id))}>{label}</button>
//       </div>
//       {visible && (
//         <div>
//           <div>{blog.url}</div>
//           <div>
//             likes {blog.likes}
//             <button onClick={() => handleLike(blog.id)}>like</button>
//           </div>
//           <div>{blog.user.name}</div>
//           {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
//         </div>
//       )}
//     </div>
//   )
// }

// Blog.propTypes = {
//   blog: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//   }).isRequired,
//   handleLike: PropTypes.func.isRequired,
//   handleRemove: PropTypes.func.isRequired,
//   own: PropTypes.bool.isRequired,
// }

// export default Blog

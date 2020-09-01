// /bloglist-frontend/src/components/NewBlog.js
// import React, { useState } from 'react'
import React from 'react'
import { Form, Button } from 'react-bootstrap'

const NewBlog = (props) => {
  // use uncontrolled
  // const [author, setAuthor] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    const author = event.target.author.value
    const title = event.target.title.value
    const url = event.target.url.value

    event.target.author.value = ''
    event.target.title.value = ''
    event.target.url.value = ''

    props.createBlog({
      title, author, url
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            type='text'
            id='author'
            name='username'
          />
          <Form.Label>title</Form.Label>
          <Form.Control
            type='text'
            id='title'
            name='title'
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            type='text'
            id='url'
            name='url'
          />
        </Form.Group>
        {/* <div>
          author
          <input
            id='author'
            name='author'
            // onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          title
          <input
            id='title'
            name='title'
          />
        </div>
        <div>
          url
          <input
            id='url'
            name='url'
          />
        </div> */}
        <Button variant='primary' type='submit' id="create">
          create
        </Button>
      </Form>
    </div>
  )
}

export default NewBlog
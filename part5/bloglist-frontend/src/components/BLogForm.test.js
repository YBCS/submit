import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('updates parent state and calls submit', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of blog form could be easier' },
  })
  fireEvent.change(author, {
    target: { value: 'buda dev' },
  })
  fireEvent.change(url, {
    target: { value: 'www.fullheadache.com' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)

  expect(createBlog.mock.calls[0][0].title).toBe(
    'testing of blog form could be easier'
  )
})



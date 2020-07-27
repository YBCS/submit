// front end testing with jest

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'How to manage stress',
    author: 'Misses Fabulous',
    url: 'https://beautyandbeast.cc/',
    likes: 50,
    user: {
      username: 'mutenR',
      name: 'Roshi',
    },
  }
  const user = {
    username: 'mutenR',
    name: 'Roshi',
  }

  const mockHandler = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} updateLike={mockHandler} />
    )
  })

  test('renders content', () => {
    // component.debug()

    expect(component.container).toHaveTextContent('Misses Fabulous')

    // const element = component.getByText('How to manage stress Misses Fabulous')
    // expect(element).toBeDefined()

    // const div = component.container.querySelector('.blog')
    // expect(div).toHaveTextContent(
    //   'beautyandbeast.cc'
    // )
  })

  test('at start renders title and author but not url or no of likes', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  // Ex: 5.14
  // checks that blog's url and number of likes
  // are shown when the button clicked.

  test('when button clicked the url, likes are shown', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  // Ex 5.15
  // when like clicked twice
  // event handler is called twice

  test('when like clicked twice, event handler called twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})


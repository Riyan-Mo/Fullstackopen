import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const blog = {
  title:'New Blog',
  author:'Riyan',
  url:'idk.com',
  likes:119,
}

test('Tests whether the form calls the event handler it received in props', async () => {
  const mockHandler = jest.fn()

  render(<BlogForm postBlog={mockHandler} blog={blog}/>)

  const user = userEvent.setup()
  let button = screen.getByText('New Blog')
  await user.click(button)

  button = screen.getByText('Create')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

})
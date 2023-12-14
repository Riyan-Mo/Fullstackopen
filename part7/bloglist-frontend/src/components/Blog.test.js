import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "New Blog",
  author: "Riyan",
  url: "idk.com",
  likes: 119,
};

test("Only renders blog's title and author", () => {
  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".blogTitleAuthor");
  expect(div).toHaveTextContent("New Blog Riyan");
});

test("Shows the blog's url and number of likes when the button is clicked", async () => {
  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".blogDetails");

  expect(div).toHaveTextContent("idk.com");
  expect(div).toHaveTextContent("119");
});

test("If the like button is clicked twice, the event handler is called twice", async () => {
  const mockHandler = jest.fn();
  render(<Blog blog={blog} handleLikes={mockHandler} />);

  const user = userEvent.setup();
  let button = screen.getByText("view");

  await user.click(button);
  button = screen.getByText("like");

  await user.dblClick(button);
  expect(mockHandler.mock.calls).toHaveLength(2);
});

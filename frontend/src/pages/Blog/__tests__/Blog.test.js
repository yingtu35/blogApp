import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../index";
import { renderWithProviders } from "../../../utils/test-utils";
import { act } from "react-dom/test-utils";

import { user, blog } from "../../../mocks/data";

describe("<Blog>", () => {
  beforeEach(() => {
    // addLikes = jest.fn()
    // removeBlog = jest.fn()

    // container = render(
    //   <Provider store={store}>
    //     <Blog />
    //   </Provider>,
    //   { route: "/blogs/1" },
    // ).container;
    const preloadedState = {
      notification: {
        message: "",
        isError: false,
      },
      blogs: [blog],
      user: user,
    };

    renderWithProviders(
      <Router initialEntries={["/blogs/1"]}>
        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Router>,
      { preloadedState: preloadedState }
    );
  });

  test("render its title", () => {
    const title = screen.getByText(blog.title);
    expect(title).toBeDefined();
  });

  test("render its url", () => {
    const url = screen.getByText(`${blog.url}`);
    expect(url).toBeDefined();
  });

  test("render its likes", () => {
    const likes = screen.getByText(`${blog.likes} likes`);
    expect(likes).toBeDefined();
  });

  test("render its author", () => {
    const author = screen.getByText(`added by ${blog.user.name}`);
    expect(author).toBeDefined();
  });

  test("display no comments when the blog has no comments", () => {
    const noComments = screen.getByText("No comments");
    expect(noComments).toBeDefined();
    // expect(detail).toHaveStyle("display: none");
  });

  test("click like button one time increment the number of likes", async () => {
    const user = userEvent.setup();

    const curLikes = blog.likes;
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    const likes = await screen.findByText(`${curLikes + 1} likes`);
    expect(likes).toBeDefined();
  });

  test("click add comment trigger a adding comment action", async () => {
    const user = userEvent.setup();

    const textField = screen.getByLabelText("Leave a comment");
    await act(async () => user.type(textField, "Type something"));
    const submitButton = screen.getByRole("button", { name: "Add comment" });
    await act(async () => user.click(submitButton));
    await waitFor(() => {
      const newComment = screen.getByText("Type something");
      expect(newComment).toBeDefined();
    });
  });
});

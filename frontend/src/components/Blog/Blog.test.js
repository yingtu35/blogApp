import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./index";
import { renderWithProviders } from "../../utils/test-utils";
import { act } from "react-dom/test-utils";

const user = {
  username: "test author",
  name: "test author",
};
const blog = {
  title: "test title",
  author: "test author",
  url: "www.test.com",
  likes: 0,
  id: "1",
  user: user,
  comments: [],
};

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
    const likes = await screen.findByText(`${curLikes+1} likes`);
    expect(likes).toBeDefined();
  });

  test("click add comment trigger a adding comment action", async () => {
    const user = userEvent.setup();

    const textField = screen.getByLabelText("Leave a comment");
    await act( async () => user.type(textField, "Type something"));
    const submitButton = screen.getByRole("button", { name: "Add comment" });
    await act( async() => user.click(submitButton));
    const newComment = screen.getByText("Type something");
    expect(newComment).toBeDefined();
  });


  // test("shows url and likes when the view button is clicked", async () => {
  //   const user = userEvent.setup();

  //   const viewButton = screen.getByText("View");
  //   await user.click(viewButton);
  //   const detail = container.querySelector(".blogDetail");
  //   const urlElement = screen.getByText("www.test.com");
  //   const likesElement = screen.getByText("0");
  //   expect(detail).not.toHaveStyle("display: none");
  //   expect(urlElement).toBeDefined();
  //   expect(likesElement).toBeDefined();
  // });

  // test("calls addLikes function twice when the like button is clicked twice", async () => {
  //   const user = userEvent.setup();

  //   const viewButton = screen.getByText("View");
  //   await user.click(viewButton);
  //   const likeButton = screen.getByText("like");
  //   await user.click(likeButton);
  //   await user.click(likeButton);

  //   expect(addLikes.mock.calls).toHaveLength(2);
  // });

  // test("shows remove button when user owns the blog", async () => {
  //   const user = userEvent.setup();

  //   const viewButton = screen.getByText("View");
  //   await user.click(viewButton);

  //   const removeButton = screen.getByText("remove");
  //   expect(removeButton).toBeDefined();
  // });

  // test("calls removeBlog function when the remove button is clicked", async () => {
  //   const user = userEvent.setup();

  //   const viewButton = screen.getByText("View");
  //   await user.click(viewButton);

  //   const removeButton = screen.getByText("remove");
  //   await user.click(removeButton);

  //   expect(removeBlog.mock.calls).toHaveLength(1);
  // });
});

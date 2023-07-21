import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Blog from "./index";
import { renderWithProviders } from "../../utils/test-utils";

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

describe("<BlogCommentForm>", () => {
  beforeEach(() => {
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

  test.only("render the text field", () => {
    const textField = screen.getByLabelText("Leave a comment");
    expect(textField).toBeDefined();
  });

  test.only("render both reset and add comment buttons", () => {
    const resetButton = screen.getByText("Reset");
    const submitButton = screen.getByText("Add comment");
    expect(resetButton).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  test("click reset button reset the comment", () => {});
  test("click add comment trigger a adding comment action", async () => {});
});

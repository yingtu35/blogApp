import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
//* wrap the code rendering it and performing updates inside an act() call. This makes your test run closer to how React works in the browser.
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import BlogCommentForm from "./BlogCommentForm";
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
  beforeEach(async () => {
    const preloadedState = {
      notification: {
        message: "",
        isError: false,
      },
      blogs: [blog],
      user: user,
    };

    act(() => renderWithProviders(
      <BlogCommentForm id={blog.id} />,
      { preloadedState: preloadedState }
    ));
  });

  test("render the text field", () => {
    const textField = screen.getByLabelText("Leave a comment");
    expect(textField).toBeDefined();
  });

  test("render reset button", () => {
    const resetButton = screen.getByRole("button", { name: "Reset" });
    expect(resetButton).toBeDefined();
  });

  test("render add comment button", () => {
    const submitButton = screen.getByRole("button", { name: "Add comment" });
    expect(submitButton).toBeDefined();
  });

  test("click reset button reset the comment", async () => {
    const user = userEvent.setup();

    const textField = screen.getByLabelText("Leave a comment");
    await act( async () => user.type(textField, "Type something"));
    const inputText = screen.getByText("Type something");
    expect(inputText).toBeDefined();

    const resetButton = screen.getByText("Reset");
    await act( async() => user.click(resetButton));
    const deletedText = screen.queryByText("Type something");
    expect(deletedText).toBeNull();
  });

  test("click add comment also reset the comment", async () => {
    const user = userEvent.setup();

    const textField = screen.getByLabelText("Leave a comment");
    await act( async () => user.type(textField, "Type something"));
    const submitButton = screen.getByRole("button", { name: "Add comment" });
    await act( async() => user.click(submitButton));
    const deletedText = screen.queryByText("Type something");
    expect(deletedText).toBeNull();
  });


});

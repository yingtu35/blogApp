import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import BlogForm from "./BlogForm";
import { renderWithProviders } from "../utils/test-utils";
import { VisibilityContext } from "../contexts/visibilityContext";
import { user, blog } from "../mocks/data";

describe("<BlogForm>", () => {
  let store;
  let toggleVisibility;
  beforeEach(() => {
    const preloadedState = {
      notification: {
        message: "",
        isError: false,
      },
      blogs: [],
      user: user,
    };

    toggleVisibility = jest.fn();

    const obj = renderWithProviders(
      <VisibilityContext.Provider value={toggleVisibility}>
        <BlogForm />
      </VisibilityContext.Provider>,
      {
        preloadedState: preloadedState,
      }
    );
    store = obj.store;
  });

  test("render its title", () => {
    const title = screen.getByText("Create a new blog");
    expect(title).toBeDefined();
  });

  test("render title field", () => {
    const titleField = screen.getByRole("textbox", { name: "title" });
    expect(titleField).toBeDefined();
  });

  test("render author field", () => {
    const authorField = screen.getByRole("textbox", { name: "author" });
    expect(authorField).toBeDefined();
  });

  test("render url field", () => {
    const urlField = screen.getByRole("textbox", { name: "url" });
    expect(urlField).toBeDefined();
  });

  test("render create button", () => {
    const createButton = screen.getByRole("button", { name: "create" });
    expect(createButton).toBeDefined();
  });

  test("press create button add a new blog to the store", async () => {
    const user = userEvent.setup();
    const newBlog = blog;

    const titleField = screen.getByRole("textbox", { name: "title" });
    const authorField = screen.getByRole("textbox", { name: "author" });
    const urlField = screen.getByRole("textbox", { name: "url" });
    const createButton = screen.getByRole("button", { name: "create" });

    await act(async () => user.type(titleField, newBlog.title));
    await act(async () => user.type(authorField, newBlog.author));
    await act(async () => user.type(urlField, newBlog.url));
    await act(async () => user.click(createButton));
    await waitFor(() => {
      const blogs = store.getState().blogs;
      expect(blogs).toHaveLength(1);
      expect(blogs[0].title).toBe(newBlog.title);
    });
    expect(toggleVisibility).toHaveBeenCalled();

    const notification = store.getState().notification;
    expect(notification.message).toBe(
      `a new blog ${newBlog.title} by ${newBlog.author} added`
    );
  });
});

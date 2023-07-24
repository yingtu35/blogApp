import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import BlogForm from "./BlogForm";
import { renderWithProviders } from "../utils/test-utils";
import { createContext } from "react";

const user = {
  username: "test author",
  name: "test author",
};

let store;
let toggleVisibility;

const VisibilityContext = createContext();

describe("<BlogForm>", () => {
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

  test.only("press create button add a new blog to the store", async () => {
    // ! Test is broken
    // ? Should visibilityContext extract out from the Togglable?
    const user = userEvent.setup();

    const titleField = screen.getByRole("textbox", { name: "title" });
    const authorField = screen.getByRole("textbox", { name: "author" });
    const urlField = screen.getByRole("textbox", { name: "url" });
    const createButton = screen.getByRole("button", { name: "create" });

    await act(async () => user.type(titleField, "test title"));
    await act(async () => user.type(authorField, "test author"));
    await act(async () => user.type(urlField, "test url"));
    await act(async () => user.click(createButton));

    const notification = store.getState().notification;
    // console.log(blogs);
    expect(notification.message).toBe("a new blog test title by test author added");
  });
});

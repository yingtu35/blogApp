import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Notification from "./Notification";
import { renderWithProviders } from "../utils/test-utils";

describe("<Notification>", () => {
  test("render error message", () => {
    const preloadedState = {
      notification: {
        message: "Something is wrong",
        isError: true,
      },
      blogs: [],
      user: null,
    };

    renderWithProviders(<Notification />, { preloadedState: preloadedState });

    const errorMessage = screen.getByText("Something is wrong");
    expect(errorMessage).toBeDefined();
  });
  test("render success message", () => {
    const preloadedState = {
      notification: {
        message: "Success!",
        isError: false,
      },
      blogs: [],
      user: null,
    };

    renderWithProviders(<Notification />, { preloadedState: preloadedState });

    const successMessage = screen.getByText("Success!");
    expect(successMessage).toBeDefined();
  });
});

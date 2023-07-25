import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Notification from "../Notification";
import { renderWithProviders } from "../../utils/test-utils";
import { successNotification, errorNotification } from "../../mocks/data";

describe("<Notification>", () => {
  test("render error message", () => {
    const preloadedState = {
      notification: errorNotification,
      blogs: [],
      user: null,
    };

    renderWithProviders(<Notification />, { preloadedState: preloadedState });

    const errorMessage = screen.getByText(errorNotification.message);
    expect(errorMessage).toBeDefined();
  });
  test("render success message", () => {
    const preloadedState = {
      notification: successNotification,
      blogs: [],
      user: null,
    };

    renderWithProviders(<Notification />, { preloadedState: preloadedState });

    const successMessage = screen.getByText(successNotification.message);
    expect(successMessage).toBeDefined();
  });
});

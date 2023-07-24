import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Login from "./Login";

let userLogin;

describe("<Login>", () => {
  beforeEach(() => {
    userLogin = jest.fn();
    render(<Login userLogin={userLogin} />);
  });

  test("render the page title", () => {
    const title = screen.getByText("Log in");
    expect(title).toBeDefined();
  });

  test("render username field", () => {
    const usernameField = screen.getByRole("textbox", { name: "username" });
    expect(usernameField).toBeDefined();
  });
  test("render password field", () => {
    const passwordField = screen.getByRole("textbox", { name: "password" });
    expect(passwordField).toBeDefined();
  });
  test("render remember me field", () => {
    const rememberField = screen.getByLabelText("Remember me");
    expect(rememberField).toBeDefined();
  });
  test("render login button", () => {
    const loginButton = screen.getByRole("button", { name: "login" });
    expect(loginButton).toBeDefined();
  });

  test.only("call userLogin function when login button is pressed", async () => {
    const user = userEvent.setup();
    // userLogin.mockReturnValue(false);

    const usernameField = screen.getByRole("textbox", { name: "username" });
    const passwordField = screen.getByRole("textbox", { name: "password" });
    await act(async () => user.type(usernameField, "root"));
    await act(async () => user.type(passwordField, "root"));
    const loginButton = screen.getByRole("button", { name: "login" });
    await act(async () => user.click(loginButton));
    expect(userLogin).toHaveBeenCalled();
  });
});

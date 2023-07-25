import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import NavBar from "../NavBar";
import { user } from "../../mocks/data";

describe("<NavBar>", () => {
  test("Render login button when user is not login", () => {
    const userLogout = jest.fn();
    render(
      <Router initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<NavBar user={null} userlogout={userLogout} />}
          />
        </Routes>
      </Router>
    );

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeDefined();
  });

  test("Display first character of user's username when user is login", () => {
    const userLogout = jest.fn();
    render(
      <Router initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<NavBar user={user} userlogout={userLogout} />}
          />
        </Routes>
      </Router>
    );

    const userFirstLetter = screen.getByText(
      user.username.charAt(0).toUpperCase()
    );
    expect(userFirstLetter).toBeDefined();
  });

  test("Display logout button when user's logo is clicked", async () => {
    const userLogout = jest.fn();
    render(
      <Router initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<NavBar user={user} userlogout={userLogout} />}
          />
        </Routes>
      </Router>
    );

    const mockUser = userEvent.setup();

    const userProfileButton = screen.getByRole("button", {
      name: "Open settings",
    });
    await act(async () => mockUser.click(userProfileButton));

    const logoutButton = screen.getByRole("menuitem", { name: "Logout" });
    expect(logoutButton).toBeDefined();
  });

  test("execute logout function when logout is clicked", async () => {
    const userLogout = jest.fn();
    render(
      <Router initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<NavBar user={user} userlogout={userLogout} />}
          />
        </Routes>
      </Router>
    );

    const mockUser = userEvent.setup();

    const userProfileButton = screen.getByRole("button", {
      name: "Open settings",
    });
    await act(async () => mockUser.click(userProfileButton));

    const logoutButton = screen.getByRole("menuitem", { name: "Logout" });
    await act(async () => mockUser.click(logoutButton));
    expect(userLogout).toHaveBeenCalled();
  });
});

import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Users from "./Users";
import User from "./User";
import { users } from "../mocks/data";

describe("<Users>", () => {
  beforeEach(() => {
    render(
      <Router initialEntries={["/users"]}>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Router>
    );
  });

  test("render users' table cells", async () => {
    const usernames = await screen.findAllByTestId("user-row");
    expect(usernames).toHaveLength(users.length);
  });

  test("click user's link direct to its user page", async () => {
    const user = userEvent.setup();
    const userLinks = await screen.findAllByRole("link", { name: "Link" });
    await act(async () => user.click(userLinks[0]));
    await waitFor(() => {
      const blogsSectionTitle = screen.getByText("Added blogs");
      expect(blogsSectionTitle).toBeDefined();
    });
  });
});

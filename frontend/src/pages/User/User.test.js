import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import User from ".";
import { users } from "../../mocks/data";

const id = "1";

describe("<User>", () => {
  beforeEach(() => {
    render(
      <Router initialEntries={[`/users/${id}`]}>
        <Routes>
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Router>
    );
  });

  test("render user's username with given id", async () => {
    const user = users.find(user => user.id === id);
    const username = await screen.findByText(user.username);
    expect(username).toBeDefined();
  });
});

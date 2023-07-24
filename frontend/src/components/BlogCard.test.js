import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogCard from "./BlogCard";
import { act } from "react-dom/test-utils";

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

describe("<BlogCard", () => {
  beforeEach(() => {
    render(
      <Router initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<BlogCard blog={blog} />} />
          {/* <Route path="/blogs/:id" element={<Blog />} /> */}
        </Routes>
      </Router>
    );
  });

  test("render its title", () => {
    const title = screen.getByText("test title");
    expect(title).toBeDefined();
  });

  test("render its author", () => {
    const author = screen.getByText("test author");
    expect(author).toBeDefined();
  });
  test("render its url", () => {
    const url = screen.getByText("www.test.com");
    expect(url).toBeDefined();
  });
  test("Press learn more button directs to its blog page", async () => {
    const user = userEvent.setup();

    const linkButton = screen.getByRole("button", { name: "Learn more" });
    await act(async () => user.click(linkButton));

    const removedButton = screen.queryByRole("button", { name: "Learn more" });
    expect(removedButton).toBeNull();
  });
});

import { screen, within } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./Blogs";
import { blogs } from "../mocks/data";

const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

describe("<Blogs>", () => {
  beforeEach(() => {
    const preloadedState = {
      notification: {
        message: "",
        isError: false,
      },
      blogs: blogs,
      user: null,
    };
    renderWithProviders(
      <Router initialEntries={["/blogs"]}>
        <Routes>
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </Router>,
      { preloadedState: preloadedState }
    );
  });

  test("display the blog with most likes first", () => {
    const displayedBlogs = screen.getAllByTestId("blog-title");
    const firstBlog = within(displayedBlogs[0]).getByText(sortedBlogs[0].title);
    expect(firstBlog).toBeDefined();
  });
});

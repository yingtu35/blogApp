import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import BlogPagination from "./BlogPagination";
import { act } from "react-dom/test-utils";
import { blogs } from "../mocks/data";

describe("<BlogPagination>", () => {
  beforeEach(() => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<BlogPagination blogs={blogs} />} />
        </Routes>
      </Router>
    );
  });

  test("render first 6 blogcard at page 1", () => {
    const blog0Title = screen.getByText(blogs[0].title);
    const blog1Title = screen.getByText(blogs[1].title);
    const blog2Title = screen.getByText(blogs[2].title);
    const blog3Title = screen.getByText(blogs[3].title);
    const blog4Title = screen.getByText(blogs[4].title);
    const blog5Title = screen.getByText(blogs[5].title);
    expect(blog0Title).toBeDefined();
    expect(blog1Title).toBeDefined();
    expect(blog2Title).toBeDefined();
    expect(blog3Title).toBeDefined();
    expect(blog4Title).toBeDefined();
    expect(blog5Title).toBeDefined();
  });

  test("does not render blogs after the first 6 blogs at page 1", () => {
    const blog6Title = screen.queryByText(blogs[6].title);
    expect(blog6Title).toBeNull();
  });

  test("show the next 6 blogs when switching from page 1 to page 2", async () => {
    const user = userEvent.setup();

    const nextPageButton = screen.getByRole("button", {
      name: "Go to next page",
    });
    await act(async () => user.click(nextPageButton));

    const blog6Title = screen.queryByText(blogs[6].title);
    expect(blog6Title).toBeDefined();
  });

  test("hide the first 6 blogs when switching from page 1 to page 2", async () => {
    const user = userEvent.setup();

    const nextPageButton = screen.getByRole("button", {
      name: "Go to next page",
    });
    await act(async () => user.click(nextPageButton));

    const blog0Title = screen.queryByText(blogs[0].title);
    const blog1Title = screen.queryByText(blogs[1].title);
    const blog2Title = screen.queryByText(blogs[2].title);
    const blog3Title = screen.queryByText(blogs[3].title);
    const blog4Title = screen.queryByText(blogs[4].title);
    const blog5Title = screen.queryByText(blogs[5].title);
    expect(blog0Title).toBeNull();
    expect(blog1Title).toBeNull();
    expect(blog2Title).toBeNull();
    expect(blog3Title).toBeNull();
    expect(blog4Title).toBeNull();
    expect(blog5Title).toBeNull();
  });

  test("show the first 6 blogs again when switching to page 1", async () => {
    const user = userEvent.setup();

    const nextPageButton = screen.getByRole("button", {
      name: "Go to next page",
    });
    await act(async () => user.click(nextPageButton));
    const page1Button = screen.getByRole("button", { name: "Go to page 1" });
    await act(async () => user.click(page1Button));

    const blog0Title = screen.getByText(blogs[0].title);
    const blog1Title = screen.getByText(blogs[1].title);
    const blog2Title = screen.getByText(blogs[2].title);
    const blog3Title = screen.getByText(blogs[3].title);
    const blog4Title = screen.getByText(blogs[4].title);
    const blog5Title = screen.getByText(blogs[5].title);
    expect(blog0Title).toBeDefined();
    expect(blog1Title).toBeDefined();
    expect(blog2Title).toBeDefined();
    expect(blog3Title).toBeDefined();
    expect(blog4Title).toBeDefined();
    expect(blog5Title).toBeDefined();
  });
});

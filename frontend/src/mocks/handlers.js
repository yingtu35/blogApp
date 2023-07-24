import { rest } from "msw";

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

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const handlers = [
  rest.put(`${baseUrl}/blogs/:id`, async (req, res, ctx) => {
    const updatedBlog = await req.json();
    return res(
      // Respond with status 200 and updatedBlog
      ctx.status(200),
      ctx.json(updatedBlog),
      ctx.delay(150)
    );
  }),

  rest.post(`${baseUrl}/blogs/:id/comments`, async (req, res, ctx) => {
    // const { id } = req.params;
    const { comment } = await req.json();
    return res(
      ctx.status(201),
      ctx.json({
        ...blog,
        comments: blog.comments.concat(comment),
      }),
      ctx.delay(150)
    );
  }),

  rest.post(`${baseUrl}/blogs`, async (req, res, ctx) => {
    console.log("post blog is intercepted");
    const body = await req.json();
    const newBlog = {
      ...body,
      likes: 0,
      id: "1",
      user: user,
      comments: [],
    };

    return res(ctx.status(201), ctx.json(newBlog), ctx.delay(150));
  }),
];

export const users = [
  {
    username: "test user 1",
    name: "test name 1",
    blogs: [],
    id: "1",
  },
  {
    username: "test user 2",
    name: "test name 2",
    blogs: [],
    id: "2",
  },
];

export const user = users[0];

export const blogs = [
  {
    title: "test title 1",
    author: "test author 1",
    url: "test url 1",
    id: "1",
    likes: 0,
    user: user,
    comments: [],
  },
  {
    title: "test title 2",
    author: "test author 2",
    url: "test url 2",
    id: "2",
    likes: 1,
    user: user,
    comments: [],
  },
  {
    title: "test title 3",
    author: "test author 3",
    url: "test url 3",
    id: "3",
    likes: 2,
    user: user,
    comments: [],
  },
  {
    title: "test title 4",
    author: "test author 4",
    url: "test url 4",
    id: "4",
    likes: 20,
    user: user,
    comments: [],
  },
  {
    title: "test title 5",
    author: "test author 5",
    url: "test url 5",
    id: "5",
    likes: 4,
    user: user,
    comments: [],
  },
  {
    title: "test title 6",
    author: "test author 6",
    url: "test url 6",
    id: "6",
    likes: 5,
    user: user,
    comments: [],
  },
  {
    title: "test title 7",
    author: "test author 7",
    url: "test url 7",
    id: "7",
    likes: 10,
    user: user,
    comments: [],
  },
];

export const blog = blogs[0];

export const credential = {
  username: "username",
  password: "password",
};

export const successNotification = {
  message: "Success!",
  isError: false,
};

export const errorNotification = {
  message: "Something is wrong",
  isError: true,
};

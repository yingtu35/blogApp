import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addLikes } from "../../reducers/BlogReducer";
import BlogCommentForm from "./BlogCommentForm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  );

  const handleLike = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(addLikes(likedBlog));
  };

  return (
    <Box>
      <Box
        sx={{
          mt: 1,
          py: 2,
          px: 2,
          backgroundColor: "ghostwhite",
          borderRadius: 5,
        }}
      >
        <Typography component="h2" variant="h4">
          {blog.title}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontStyle: "italic" }}
        >
          URL:{" "}
          <a href={`//${blog.url}`} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </Typography>
        <div className="like">
          {blog.likes} likes
          <button onClick={handleLike} className="like-button">
            like
          </button>
        </div>
        <div>added by {blog.user.name}</div>
      </Box>
      <Box
        sx={{
          mt: 2,
          py: 2,
          px: 2,
          backgroundColor: "ghostwhite",
          borderRadius: 5,
        }}
      >
        <Typography component="h2" variant="h4">
          Comments
        </Typography>
        <BlogCommentForm id={id} />
      </Box>
      <Box
        sx={{
          mt: 1,
          py: 2,
          px: 2,
          backgroundColor: "ghostwhite",
          borderRadius: 5,
        }}
      >
        {blog.comments.length === 0 ? (
          <Typography variant="body">No comments</Typography>
        ) : (
          <ul>
            {blog.comments.map((comment, idx) => (
              <li key={idx}>{comment}</li>
            ))}
          </ul>
        )}
      </Box>
    </Box>
  );
};

export default Blog;

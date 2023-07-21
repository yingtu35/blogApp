import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../reducers/BlogReducer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const BlogCommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { comment };
    const isCreated = dispatch(createComment(id, payload));
    if (isCreated) {
      setComment("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 1,
        boxShadow: "0 5px 5px 0 #888888",
        borderRadius: "10px",
        backgroundColor: "white",
      }}
    >
      <TextField
        multiline
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        rows={4}
        label="Leave a comment"
      />
      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => setComment("")}
        >
          Reset
        </Button>
        <Button type="submit" variant="contained">
          Add comment
        </Button>
      </Box>
    </Box>
  );
};

export default BlogCommentForm;

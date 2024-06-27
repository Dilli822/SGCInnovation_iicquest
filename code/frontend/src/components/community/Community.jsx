import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  InputBase,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  Search as SearchIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import Header from "../header/header";
import HeaderPublic from "../header/header_public";
import AppFooter from "../footer/footer";

function Community() {
  // State to hold the posts fetched from the API
  const [posts, setPosts] = useState([]);

  // State to manage expanded post details
  const [expandedPostId, setExpandedPostId] = useState(null);

  // State for handling search input
  const [searchTerm, setSearchTerm] = useState("");

  // State for handling new comments input
  const [newComments, setNewComments] = useState({});

  // State for handling new post input
  const [newPost, setNewPost] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");

  // Fetch posts from API on component mount
  useEffect(() => {
    fetchPosts();
    fetchUserData();
  }, []);

  // Function to fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/sushtiti/community/api/posts/public/list/"
      );
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Function to fetch user data and store user ID in localStorage
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:8000/sushtiti/account/auth/user/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const userId = data.id;
        localStorage.setItem("userId", userId);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle new comment input change for a specific post
  const handleNewCommentChange = (postId, event) => {
    setNewComments({
      ...newComments,
      [postId]: event.target.value,
    });
  };

  // Function to handle new post input change
  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  };

  // Function to handle new post title input change
  const handleNewPostTitleChange = (event) => {
    setNewPostTitle(event.target.value);
  };

  // Function to submit a new comment for a specific post
  const handleAddComment = async (postId) => {
    const commentData = {
      post: postId,
      text: newComments[postId],
      user: localStorage.getItem("userId"),
    };

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:8000/sushtiti/community/api/posts/${postId}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(commentData),
        }
      );

      if (response.ok) {
        const addedComment = await response.json();
        // Update local state to reflect new comment
        setPosts(
          posts.map((post) => {
            if (post.post.id === postId) {
              return {
                ...post,
                comments: [...post.comments, addedComment],
              };
            }
            return post;
          })
        );
        setNewComments({
          ...newComments,
          [postId]: "", // Clear comment input for the specific post
        });
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Function to submit a new post
  const handleAddPost = async () => {
    const postData = {
      title: newPostTitle,
      content: newPost,
      author: localStorage.getItem("userId"),
    };

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:8000/sushtiti/community/api/posts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        const addedPost = await response.json();
        // Update local state to reflect new post
        setPosts([...posts, { post: addedPost, comments: [] }]);
        setNewPost(""); // Clear new post input
        setNewPostTitle(""); // Clear new post title input
      } else {
        console.error("Failed to add post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) => {
    const { title, content } = post.post;
    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      title.toLowerCase().includes(lowerCaseSearch) ||
      content.toLowerCase().includes(lowerCaseSearch)
    );
  });

  // Function to handle expanding/collapsing post details
  const handleExpand = (postId) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  // Function to handle showing/hiding comments for a post
  const handleShowComments = (postId) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  // Function to handle sharing a post
  const handleShare = (slug) => {
    alert(`Shared post with slug: ${slug}`);
  };

  const accessToken = localStorage.getItem("accessToken");

  return (
    <>
      {accessToken ? <Header /> : <HeaderPublic />}
      <Container maxWidth={"lg"}> 
      <Box p={4}>
        <Typography variant="h3" fontWeight="bold" spacing={2}>
          Community & Support
        </Typography>

        <Typography variant="h5" fontWeight="bold" mb={4}>
          Activity Feed
        </Typography>

        {/* Search Input */}
        <Box mb={4}>
          <InputBase
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1 }}
            fullWidth
          />
        </Box>

        {/* New Post Input */}
        <Box mb={4} display="flex" flexDirection="column">
          <TextField
            label="Title"
            variant="outlined"
            value={newPostTitle}
            onChange={handleNewPostTitleChange}
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Ask a question or share your thoughts"
            variant="outlined"
            multiline
            rows={4}
            value={newPost}
            onChange={handleNewPostChange}
            sx={{ mb: 2 }}
            fullWidth
          />
          <Grid item md={3}>
            <Button color="primary" variant="contained" onClick={handleAddPost}>
              Post
            </Button>
          </Grid>
        </Box>

        {/* Display Filtered Posts */}
        {filteredPosts.map(({ post, comments }) => (
          <Card key={post.id} sx={{ mb: 4 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  alt="User Avatar"
                  src="https://placehold.co/40x40"
                  sx={{ mr: 2 }}
                />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {post.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.title} -{" "}
                    {new Date(post.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="textSecondary" mb={2}>
                {post.content}
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button color="primary" onClick={() => handleExpand(post.id)}>
                  {expandedPostId === post.id ? "Close" : "Read more"}
                </Button>
                <Box>
                  <IconButton
                    color="inherit"
                    onClick={() => handleExpand(post.id)}
                  >
                    <CommentIcon />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {expandedPostId === post.id
                        ? "Hide Comments"
                        : "Show Comments"}
                    </Typography>
                  </IconButton>
                  <IconButton
                    color="inherit"
                    // onClick={() => handleShare(post.post.slug)}
                  >
                    <ShareIcon />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      Share
                    </Typography>
                  </IconButton>
                </Box>
              </Box>
              {expandedPostId === post.id && (
                <>
                  <Divider sx={{ my: 2 }} />
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <Box
                        key={comment.id}
                        display="flex"
                        alignItems="center"
                        mb={1}
                      >
                        <Avatar
                          alt="User Avatar"
                          src="https://placehold.co/40x40"
                          sx={{ mr: 2 }}
                        />
                        <Typography variant="body2" color="textSecondary">
                          {comment.text} -{" "}
                          {new Date(comment.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No comments yet.
                    </Typography>
                  )}
                  <Box mt={2} display="flex" alignItems="center">
                    <TextField
                      label="Add a comment"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={newComments[post.id] || ""}
                      onChange={(event) =>
                        handleNewCommentChange(post.id, event)
                      }
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{ ml: 2 }}
                      onClick={() => handleAddComment(post.id)}
                    >
                      Submit
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        ))}
              </Box>
      </Container>

  

      <AppFooter>

</AppFooter>

    </>
  );
}

export default Community;

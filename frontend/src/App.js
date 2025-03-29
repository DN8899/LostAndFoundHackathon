import "./App.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Added Link and Route from react-router-dom
import ProfilePage from "./ProfilePage";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import FeedDashboard from "./FeedPage/FeedDashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  // Store user information
  const [user, setUser] = useState({
    username: "John Doe",
    email: "johndoe@example.com",
  });

  // Update user info function
  const updateUserInfo = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsDialogOpen(false); // Close the dialog on successful login
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    console.log("Account created");
    setIsCreatingAccount(false);
    setIsDialogOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDialogOpen(false); // Ensure the dialog is closed after logging out
    setEmail("");
    setPassword("");
  };

  const toggleDialog = () => {
    setIsDialogOpen(true); // Open the dialog
    setIsCreatingAccount(false); // Start with the login mode
  };

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const submitPost = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: postContent }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts([...posts, newPost.content]);
        setPostContent("");
        toast.success("Post added successfully!");
      } else {
        toast.error("Failed to submit post");
      }
    } catch (err) {
      toast.error("An error occurred while adding the post");
      console.error(err);
    }
  };

  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              backgroundColor: "#ffaa00",
              color: "white",
            },
          }}
        >
          <Toolbar>
            <Typography variant="h6">Lost and Found</Typography>
          </Toolbar>
          <List>
            {["Home", "Feed", "Profile", "Settings"].map((text) => (
              <ListItem
                button
                key={text}
                component={Link}
                to={text === "Profile" ? "/profile" : "/"}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#f7b267",
            overflow: "auto",
          }}
        >
          <AppBar
            position="static"
            color="default"
            sx={{
              mb: 3,
              backgroundColor: "white",
              boxShadow: "none",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Toolbar sx={{ justifyContent: "flex-end" }}>
              <Button
                variant={isLoggedIn ? "contained" : "outlined"}
                color={isLoggedIn ? "error" : "primary"}
                onClick={isLoggedIn ? handleLogout : toggleDialog}
              >
                {isLoggedIn ? "Logout" : "Login / Create Account"}
              </Button>
            </Toolbar>
          </AppBar>

          {isLoggedIn && (
            <Box component="form" onSubmit={submitPost} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Lost Something?"
                value={postContent}
                onChange={handlePostChange}
                sx={{ mb: 2 }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ marginBottom: "10px" }}
              />
              <Button type="submit" variant="contained" color="primary">
                Post
              </Button>
            </Box>
          )}

          <Card>
            <CardContent>
              <Typography variant="h5">
                <FeedDashboard/>
              </Typography>
              {posts.length === 0 ? (
                <Typography>No Posts yet. Click "Post" to add one!</Typography>
              ) : (
                posts.map((post, index) => (
                  <Card key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
                    <Typography>{post}</Typography>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </Box>

        <Dialog
          open={isDialogOpen}
          onClose={toggleDialog}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>
            {isCreatingAccount ? "Create Account" : "Login"}
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleDialog}>Cancel</Button>
            <Button
              onClick={isCreatingAccount ? handleCreateAccount : handleLogin}
              variant="contained"
              color="primary"
            >
              {isCreatingAccount ? "Sign Up" : "Login"}
            </Button>
          </DialogActions>
          <Box textAlign="center" p={2}>
            <Typography variant="body2">
              {isCreatingAccount
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <Button
                onClick={() => setIsCreatingAccount(!isCreatingAccount)}
                color="primary"
                size="small"
              >
                {isCreatingAccount ? "Login" : "Create Account"}
              </Button>
            </Typography>
          </Box>
        </Dialog>
      </Box>

      {/* Add ProfilePage Route */}
      <Routes>
        <Route
          path="/profile"
          element={<ProfilePage user={user} updateUserInfo={updateUserInfo} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

import './App.css';
import React, { useState } from 'react';
import {
    AppBar,
    Box, Button,
    Card,
    CardContent,
    Dialog,
    DialogActions, DialogContent,
    DialogTitle,
    Drawer,
    List,
    ListItem,
    ListItemText,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // ToDo: actual login logic
        setIsLoggedIn(true);
        setIsLoggedIn(false);
    };

    const handleCreateAccount = () => {
        // ToDo: create account logic
        console.log('Create account clicked');
    };

    const toggleLogin = () => {
        if (isLoggedIn) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    };

    const handlePostChange = (e) => {
        setPostContent(e.target.value);
    };

    const submitPost = async (e) => {
        e.preventDefault();
        if (!postContent.trim()) return;

        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content: postContent}),
            });

            if (response.ok) {
                const newPost = await response.json();
                setPosts([...posts, newPost.content]);
                setPostContent('');
            } else {
                console.error('Failed to subit post');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{display: 'flex', height: '100vh'}}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        backgroundColor: '3b444b',
                        color: 'white',
                    },
                }}
            >

                <Toolbar>
                    <Typography variant="h6">Navigation</Typography>
                </Toolbar>
                <List>
                    {['Home', 'Feed', 'Profile', 'Settings'].map((text) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: '#f4f4f4',
                    overflow: 'auto'
                }}
            >
                {/* App Bar */}
                <AppBar
                    position="static"
                    color="default"
                    sx={{
                        mb: 3,
                        backgroundColor: 'white',
                        boxShadow: 'none',
                        borderBottom: '1px solid #e0e0e0'
                    }}
                >
                    <Toolbar sx={{justifyContent: 'flex-end'}}>
                        <Button
                            variant={isLoggedIn ? 'outlined' : 'contained'}
                            color={isLoggedIn ? "error" : "primary"}
                            onClick={toggleLogin}
                        >
                            {isLoggedIn ? 'Logout' : 'Login / Create Account'}
                        </Button>
                    </Toolbar>
                </AppBar>

                {/* Post Input */}
                {isLoggedIn && (
                    <Box component="form" onSubmit={submitPost} sx={{mb: 3}}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="Lost Something?"
                            value={postContent}
                            onChange={handlePostChange}
                            sx={{mb: 2}}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Post
                        </Button>
                    </Box>
                )}
                {/* Feed */}
                <Card>
                    <CardContent>
                        <Typography variant="h5" sx={{mb: 2}}>
                            Feed
                        </Typography>
                        {posts.length === 0 ? (
                            <Typography>No Posts yet. Click "Post" to add one!</Typography>
                        ) : (
                            posts.map((post, index) => (
                                <Card
                                    key={index}
                                    variant="outlined"
                                    sx={{
                                        mb: 2,
                                        p: 2,
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5'
                                        }
                                    }}
                                >
                                    <Typography>{post}</Typography>
                                </Card>
                            ))
                        )}
                    </CardContent>
                </Card>
            </Box>

            {/* Login Dialog */}
            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Login To Your Account</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{mb: 2}}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                </DialogActions>
                <Box textAlign="center pb={2}">
                    <Typography variant="body2">
                        Don't Have an account? {' '}
                        <Button
                            color="primary"
                            onClick={handleCreateAccount}
                            size="small"
                        >
                            Create Account
                        </Button>
                    </Typography>
                </Box>
            </Dialog>
        </Box>
    );
};
/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;